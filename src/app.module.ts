import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppUserModule } from './app-user/app-user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'user',
      autoLoadEntities: true,
      synchronize: true
    }),
    AppUserModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
