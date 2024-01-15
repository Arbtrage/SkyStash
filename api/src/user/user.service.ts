import { Injectable } from '@nestjs/common';
import { Prisma, Auth } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
}
