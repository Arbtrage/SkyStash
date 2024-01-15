import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { Auth } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from '../common/types/Jwt-Payload.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  async register(@Body() user:Auth) {
    return this.authService.register(user);
  }

  @Post("/login")
  async login(@Body() user:Auth) {
    return this.authService.login(user);
  }
  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@GetCurrentUser() user:JwtPayload) {
    return this.authService.logout(user);
  }
}
