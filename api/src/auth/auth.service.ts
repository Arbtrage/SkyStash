import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt } from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  private async toHash(password: string) {
    const scryptAsync = promisify(scrypt);
    const salt = randomBytes(16).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }
  private async compare(storedPassword: string, suppliedPassword: string) {
    const scryptAsync = promisify(scrypt);
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }

  async register(userData: Auth) {
    const userExists = await this.prisma.auth.findFirst({
      where: {
        email: userData.email
      },
    });
    if (userExists) {
      throw new Error('User already exists');
    } else {
      try {
        const newHashPass = await this.toHash(userData.password);
        const user=await this.prisma.auth.create({
          data: {
            email: userData.email,
            password: newHashPass
          }
        });
        const tokenPayload = { id:user.id,email: userData.email };
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(tokenPayload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: '15m',
          }),
          this.jwtService.signAsync(tokenPayload, {
            secret: process.env.JWT_REFRESH_SECRET_KEY,
            expiresIn: '7d',
          }),
        ]);
        await this.prisma.auth.update({
          where: {
            id: user.id,
          },
          data: {
            refresh_Token:refreshToken,
          },
        });
        await this.prisma.user.create({
          data: {
            name: userData.email,
            Auth: {
              connect: {
                id: user.id
              }
            }
          }
        });
        return { accessToken, refreshToken };
      } catch (error) {
        throw new BadRequestException("Some error happened")
      }
    }
  }
  async login(userData: Auth) {
    const user = await this.prisma.auth.findFirst({
      where: {
        email: userData.email
      },
    });
    if (!user) throw new NotFoundException("User Not Found");
    if (!await this.compare(user.password, userData.password)) throw new BadGatewayException("Wrong Password");
    const tokenPayload = { id:user.id,email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(tokenPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(tokenPayload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: '7d',
      }),
    ]);
    await this.prisma.auth.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_Token:refreshToken,
      },
    });
    return { accessToken, refreshToken };
  }
  async logout(user: any) {
    await this.prisma.auth.update({
      where: { id: user.id },
      data: { refresh_Token: null },
    });

    return {
      message: 'User logged out successfully',
    };
  }
}
