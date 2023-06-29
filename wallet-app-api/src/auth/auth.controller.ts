// Nest
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

// Internal
import { Auth, GetToken, GetUser } from './decorators';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UserResponseDto } from './dtos';
import { User } from './entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Register a new user',
  })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: UserResponseDto,
  })
  @Post('register')
  @HttpCode(200)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Login a user', description: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    type: UserResponseDto,
  })
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Refresh token', description: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    type: UserResponseDto,
  })
  @Auth()
  @HttpCode(200)
  @Post('refresh-token')
  refreshToken(@GetUser() user: User, @GetToken() token: string) {
    return this.authService.refreshToken(user, token);
  }
}
