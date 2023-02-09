import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsOptional, MaxLength } from 'class-validator'

export class FindPortalUserDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiProperty({ required: false })
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string
}
