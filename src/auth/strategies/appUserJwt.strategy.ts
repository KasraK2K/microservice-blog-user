import { AppUser } from '../../app-user/entities/app-user.entity'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IPayload } from '../interfaces/payload.interface'
import { StrategyName, RoleName } from '../../common/enums/general.enum'
import { AppUserService } from '../../app-user/app-user.service'

@Injectable()
export class AppUserJwtStrategy extends PassportStrategy(Strategy, StrategyName.APP_USER) {
  constructor(private readonly appUserService: AppUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: IPayload): Promise<AppUser> {
    const { id, role } = payload
    let appUser: AppUser
    if (role === RoleName.USER) {
      appUser = await this.appUserService.findById(id)
      return appUser
    }
  }
}
