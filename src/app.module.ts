import { Module } from '@nestjs/common';
import { AppUserModule } from './app-user/app-user.module';

@Module({
  imports: [AppUserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
