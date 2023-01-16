import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AppUserService } from '../app-user/app-user.service'
import { AppUserJwtStrategy } from './strategies/appUserJwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { AppUser } from '../app-user/entities/app-user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppUser]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AppUserService, AppUserJwtStrategy]
})
export class AuthModule {}
