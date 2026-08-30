import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAccessGuard } from './jwt-access.guard';

@Module({

  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=> ({
        secret:configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions:{expiresIn:'15m'}
      })
    }),],

  controllers: [AuthController,],
  providers: [AuthService,JwtAccessGuard],
  exports: [JwtAccessGuard],


})
export class AuthModule {}