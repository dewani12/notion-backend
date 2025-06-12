import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ 
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ 
        example: 'test@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ 
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}