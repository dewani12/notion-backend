import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException('Username or Email is already in use');
    }

    const hashedPassword = await argon.hash(createUserDto.password);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password -refreshToken');
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).select('-password -refreshToken');
  }

  async update(userId: string, update: Partial<User>) {
    return this.userModel
      .findByIdAndUpdate(userId, update, { new: true })
      .select('-password -refreshToken');
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }
}
