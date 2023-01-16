import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsStrongPassword, Length, MaxLength } from 'class-validator'

export class LoginDto {
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
    description: 'This password is checked against the hashed version that we saved in the registry'
  })
  @IsStrongPassword()
  @Length(8, 100)
  password: string
}
