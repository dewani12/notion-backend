import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto, TokensDto } from './dto';
import * as argon from 'argon2';
import { CreateUserDto } from '../users/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto): Promise<TokensDto> {
    try {
      const user = await this.usersService.create(dto);
      const tokens = await this.getTokens(user._id.toString(), user.email);
      await this.hashedRt(user._id.toString(), tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.code === 11000) {
        throw new ForbiddenException('User already exists');
      }
      throw error;
    }
  }

  async signin(dto: SignInDto): Promise<TokensDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.hashedRt(user._id.toString(), tokens.refreshToken);
    return tokens;
  }

  private async getTokens(userId: string, email: string): Promise<TokensDto> {
    const payload = { sub: userId, email };
    
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async hashedRt(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
  }
}