import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { SignInDto, TokensDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: CreateUserDto): Promise<TokensDto> {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: SignInDto): Promise<TokensDto> {
        return this.authService.signin(dto);
    }
}
