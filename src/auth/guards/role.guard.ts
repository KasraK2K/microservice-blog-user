import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExtractJwt } from 'passport-jwt'
import { verify } from 'jsonwebtoken'
import { IPayload } from '../interfaces/payload.interface'
import { RoleName } from '../../common/enums/general.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    let payload: IPayload

    if (token) {
      verify(token, String(process.env.JWT_SECRET), (err: any, decoded: IPayload) => {
        if (err) throw new ForbiddenException('Your token is not valid')
        else {
          typeof decoded === 'object' && Object.keys(decoded).length && (payload = { ...decoded })
          Object.assign(response, { locals: { tokenData: { ...decoded } } })
        }
      })
    } else throw new ForbiddenException('Token not found')

    const roles: RoleName[] = this.reflector.get<RoleName[]>('roles', context.getHandler())

    const permissions = this.reflector.get<string[]>('permissions', context.getHandler())
    const user = request.user

    // ─── CHECK SOME CONDITIONS ───────────────────────────────────────
    if (user.isSuperuser) return true
    if (!user.active) throw new ForbiddenException('You account is not active')
    if (!roles.includes(payload.role)) throw new ForbiddenException('You cant access this role')

    let hasPermission = false
    for (const permission of permissions) {
      if (user.permission >= permission) hasPermission = true
    }

    if (!hasPermission) throw new ForbiddenException('You cant access this permission')

    // ─── RETURN CAN ACTIVATE OR NOT ──────────────────────────────────
    return true
  }
}
