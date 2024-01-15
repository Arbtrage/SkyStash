import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Put,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

}
