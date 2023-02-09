import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PortalUserService } from './portal-user.service'
import { PortalUserController } from './portal-user.controller'
import { PortalUser } from './entities/portal-user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PortalUser])],
  controllers: [PortalUserController],
  providers: [PortalUserService]
})
export class PortalUserModule {}
