import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    console.log('AUTH GUARD RUNNING');

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(
        'Access token is required',
      );
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Invalid authorization header',
      );
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_SECRET',
        ),
      });
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired access token',
      );
    }

    return true;
  }
}