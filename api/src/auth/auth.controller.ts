import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  async register(@Body() body:any) {
    return body;
  }
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
