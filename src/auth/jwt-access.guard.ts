import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { Request } from 'express';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing access token');
    }

    const token = authorizationHeader.replace('Bearer ', '').trim();
    const accessSecret = this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: accessSecret,
      });

      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
