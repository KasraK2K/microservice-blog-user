import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsStrongPassword, Length, MaxLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    type: String,
    example: 'Kasra.Karami.KK@gmail.com',
    description: 'Registered email'
  })
  @IsEmail()
  @MaxLength(100)
  email: string

  @ApiProperty({
    type: String,
    example: '123Kk456',
    description: 'This password will be hash then save'
  })
  @IsStrongPassword()
  @Length(8, 100)
  password: string
}
