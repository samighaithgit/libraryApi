import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import type { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {

    const existingUser =
      await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(
        'Email already registered'
      );
    }

    const passwordHash =
      await bcrypt.hash(dto.password, 10);

    const user =
      await this.usersService.create(
        dto.email,
        passwordHash,
      );

    return {
      id: user.id,
      email: user.email,
    };
  }





  

  async login(dto: LoginDto) {

  const user =
    await this.usersService.findByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedException(
      'Invalid email or password'
    );
  }

  const passwordIsCorrect =
    await bcrypt.compare(
      dto.password,
      user. hashedpassword,
    );

  if (!passwordIsCorrect) {
    throw new UnauthorizedException(
      'Invalid email or password' 
    );
  }

  const payload = {
    sub: user.id,
    email: user.email,
  };

  const accessToken =
    await this.jwtService.signAsync(
      payload,
      {
        expiresIn: '15m',
      },
    );

  const refreshToken =
    await this.jwtService.signAsync(
      payload,
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

  return {
    accessToken,
    refreshToken,
  };
}








async refresh(dto: RefreshTokenDto) {

  try {

    const payload =
      await this.jwtService.verifyAsync(
        dto.refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

    const user =
      await this.usersService.findById(
        payload.sub
      );

    if (!user) {
      throw new UnauthorizedException();
    }

    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          expiresIn: '15m',
        },
      );

    return {
      accessToken,
    };

  } catch {

    throw new UnauthorizedException(
      'Invalid or expired refresh token'
    );
  }
}

}