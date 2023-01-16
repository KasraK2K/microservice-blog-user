import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsOptional, MaxLength } from 'class-validator'

export class FindAppUserDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string
}
