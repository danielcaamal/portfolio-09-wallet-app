// Nest
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// External
import * as bcrypt from 'bcrypt';

// Internal
import {
  CreateUserDto,
  JwtPayloadDto,
  LoginUserDto,
  UpdateUserDto,
  UserResponseDto,
} from './dtos';
import { User } from './entities';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createUser = async (
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> => {
    // const { password, ...userData } = createUserDto;
    // const userExits = await this.findOneUserByEmail(userData.email);
    // if (userExits) throw new BadRequestException('User already exists');
    // const user = new this.userModel(userData);
    // user.password = await bcrypt.hash(password, 10);
    // const newUser = await user.save();
    // return {
    //   id: newUser.id,
    //   email: newUser.email,
    //   fullName: newUser.fullName,
    //   token: await this.getJwtToken({ userId: newUser.id }),
    // };
    throw new NotImplementedException();
  };

  login = async (loginUserDto: LoginUserDto): Promise<UserResponseDto> => {
    // const user = await this.findOneUserByEmail(loginUserDto.email);
    // if (!user) throw new BadRequestException('Invalid credentials');
    // return {
    //   id: user.id,
    //   email: user.email,
    //   fullName: user.fullName,
    //   token: await this.getJwtToken({ userId: user.id }),
    // };
    throw new NotImplementedException();
  };

  refreshToken = async (
    user: User,
    token: string,
  ): Promise<UserResponseDto> => {
    // if (!token) throw new BadRequestException('Invalid token');
    // const tokenPayload = this.jwtService.decode(token.toString()) as JwtPayload;
    // if (tokenPayload.userId !== user.id)
    //   throw new BadRequestException('Invalid token');
    // return {
    //   id: user.id,
    //   email: user.email,
    //   fullName: user.fullName,
    //   token: await this.getJwtToken({ userId: user.id }),
    // };
    throw new NotImplementedException();
  };

  updateUser = async (
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> => {
    // const { password, id, ...userData } = updateUserDto;
    // const changes = new UpdateUserDto(userData);
    // if (password) {
    //   changes.password = await bcrypt.hash(password, 10);
    // }
    // const updatedUser = await this.userModel
    //   .findByIdAndUpdate(id, changes, { new: true })
    //   .exec();
    // if (!updatedUser) throw new NotFoundException('User not found');
    // return {
    //   id: updatedUser.id,
    //   email: updatedUser.email,
    //   fullName: updatedUser.fullName,
    //   token: await this.getJwtToken({ userId: updatedUser.id }),
    // };
    throw new NotImplementedException();
  };

  private getJwtToken = async (payload: JwtPayloadDto): Promise<string> => {
    const token = await this.jwtService.signAsync(payload);
    return token;
  };

  findOneValidUserByIdOrError = async (id: string): Promise<User> => {
    const user = await this.findOneUserById(id);
    // Validate user over properties
    if (!user) throw new NotFoundException('User not found');
    return user;
  };

  findOneUserById = async (id: string): Promise<User | undefined> => {
    // const user = await this.userModel.findById(id).select('+password');
    // return user;
    throw new NotImplementedException();
  };

  findOneUserByEmail = async (email: string): Promise<User | undefined> => {
    // const user = await this.userModel
    //   .findOne({ email })
    //   .select('+password')
    //   .exec();
    // return user;
    throw new NotImplementedException();
  };

  hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  };

  comparePassword = async (
    password: string,
    hash: string,
  ): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  };
}
