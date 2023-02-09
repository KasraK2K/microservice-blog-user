import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config'
import { AppUserModule } from './app-user/app-user.module'
import { MysqlDatabaseType } from './common/interfaces/general.interface'
import { AuthModule } from './auth/auth.module'
import { PortalUserModule } from './portal-user/portal-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? ['.env.development', '.env']
          : process.env.NODE_ENV === 'production'
          ? ['.env.production', '.env']
          : ['.env.development.local', '.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as MysqlDatabaseType,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true
    }),
    AppUserModule,
    AuthModule,
    PortalUserModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
