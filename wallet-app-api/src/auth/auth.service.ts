// Nest
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

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
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser = async (
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> => {
    const { password, ...userData } = createUserDto;
    const userExits = await this.findOneUserByEmail(userData.email);
    if (userExits) throw new BadRequestException('User already exists');
    const user = await this.userRepository.create(userData);
    user.password = await this.hashPassword(password);
    const newUser = await this.userRepository.save(user);
    return {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      token: await this.getJwtToken({ userId: newUser.id }),
    };
  };

  login = async (loginUserDto: LoginUserDto): Promise<UserResponseDto> => {
    const user = await this.findOneUserByEmail(loginUserDto.email);
    if (!user) throw new BadRequestException('Invalid credentials');
    const isValidPassword = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isValidPassword) throw new BadRequestException('Invalid credentials');
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      token: await this.getJwtToken({ userId: user.id }),
    };
  };

  refreshToken = async (
    user: User,
    token: string,
  ): Promise<UserResponseDto> => {
    if (!token) throw new BadRequestException('Invalid token');
    const tokenPayload = this.jwtService.decode(
      token.toString(),
    ) as JwtPayloadDto;
    if (tokenPayload.userId !== user.id)
      throw new BadRequestException('Invalid token');
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      token: await this.getJwtToken({ userId: user.id }),
    };
  };

  updateUser = async (
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> => {
    const { password, id, ...userData } = updateUserDto;
    const changes = new UpdateUserDto(userData);
    if (password) {
      changes.password = await this.hashPassword(password);
    }
    const updatedUser = await this.userRepository.preload({
      id,
      ...changes,
    });
    if (!updatedUser) throw new NotFoundException('User not found');
    await this.userRepository.save(updatedUser);
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      token: await this.getJwtToken({ userId: updatedUser.id }),
    };
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
    const user = await this.userRepository.findOneBy({ id });
    return user;
  };

  findOneUserByEmail = async (email: string): Promise<User | undefined> => {
    const user = await this.userRepository.findOneBy({ email });
    return user;
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
