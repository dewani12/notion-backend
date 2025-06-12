import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User{

    @Transform(({ value }) => value.toString())
    _id: string;

    @ApiProperty({
        example: 'johndoe',
    })
    @Prop({ unique: true })
    username: string;

    @ApiProperty({
        example: 'test@gmail.com',
    })
    @Prop({ unique: true })
    email: string;
    
    @ApiProperty({
        example: 'password123',
        minLength: 6,
        maxLength: 20,
    })
    @Prop()
    password: string;

    @Prop({ type: String, default: null, select: false })
    refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
