import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  fullName: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  token: string;
}
