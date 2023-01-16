import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { StrategyName } from '../../common/enums/general.enum'

/**
 * @class AppUserGuard
 * @extends {AuthGuard(StrategyName.APP_USER)}
 * NOTE: This class because of exteds from `AuthGuard` and get a name recognize out strategy with `StrategyName.APP_USER`
 * so when we use this class before method or class, it automatically check token and if token was not found send `Unauthorized` error name
 */
@Injectable()
export class AppUserGuard extends AuthGuard(StrategyName.APP_USER) {}
