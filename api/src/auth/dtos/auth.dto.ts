import { IsAscii, IsEmail, IsNotEmpty } from 'class-validator';
export class Auth {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsAscii()
  password: string;
}
