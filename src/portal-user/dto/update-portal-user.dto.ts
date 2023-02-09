import { PartialType } from '@nestjs/swagger'
import { CreatePortalUserDto } from './create-portal-user.dto'

export class UpdatePortalUserDto extends PartialType(CreatePortalUserDto) {}
