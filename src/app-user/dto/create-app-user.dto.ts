import { ApiProperty } from '@nestjs/swagger';

export class CreateAppUserDto {
  @ApiProperty({ required: false })
  first_name: string;

  @ApiProperty({ required: false })
  last_name: string;

  @ApiProperty({ required: false, default: true })
  is_active: boolean;

  @ApiProperty({ required: false, default: false })
  is_blocked: boolean;

  // @ApiProperty({ required: false, default: false })
  // is_superuser: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
