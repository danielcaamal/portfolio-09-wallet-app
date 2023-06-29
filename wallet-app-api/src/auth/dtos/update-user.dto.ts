// Nest
import { PartialType } from '@nestjs/mapped-types';

// External
import { CreateUserDto } from './create-user.dto';

// Internal
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  id: string;
}
