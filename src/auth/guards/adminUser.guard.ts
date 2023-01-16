import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { StrategyName } from '../../common/enums/general.enum'

@Injectable()
export class AdminUserGuard extends AuthGuard(StrategyName.ADMIN_USER) {}
