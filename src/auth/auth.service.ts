import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { AppUser } from '../app-user/entities/app-user.entity'
import { AppUserService } from '../app-user/app-user.service'
import { IPayload } from './interfaces/payload.interface'
import { RoleName, ServiceName, TokenType } from 'src/common/enums/general.enum'

@Injectable()
export class AuthService {
  constructor(private readonly appUserService: AppUserService, private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.validateUser(email, password)
    if (!user) throw new ForbiddenException('Your email or password is wrong.')
    const payload: IPayload = {
      service: ServiceName.USER,
      role: RoleName.USER,
      type: TokenType.TOKEN,
      id: user.id
    }
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
    }
  }

  private async validateUser(email: string, password: string): Promise<AppUser> {
    const user = await this.appUserService.findOne({ email })
    if (user && user.comparePassword(password)) return user
  }
}
