import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAppUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
