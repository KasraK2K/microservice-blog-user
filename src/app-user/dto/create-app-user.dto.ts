import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword, Length, MaxLength } from 'class-validator'

export class CreateAppUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  first_name: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  surname: string

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  email: string

  @ApiProperty()
  @IsStrongPassword()
  @Length(8, 20)
  password: string

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active: boolean
}
