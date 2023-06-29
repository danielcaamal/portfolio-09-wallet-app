// Nest
import { ApiProperty } from '@nestjs/swagger';

// External
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, type: String, minLength: 1, example: 'John' })
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 6,
    maxLength: 50,
    example: 'email@email.com',
  })
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 6,
    maxLength: 50,
    example: 'Password123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
