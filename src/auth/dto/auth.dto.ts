import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: 'The password is too short',
  })
  @MaxLength(24, {
    message: 'The password is too long',
  })
  password: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

