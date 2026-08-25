import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { Repository } from 'typeorm';

import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  findByEmail(email: string) {

    return this.userRepository.findOneBy({
      email: email,
    });

  }

  findById(id: number) {

    return this.userRepository.findOneBy({
      id: id,
    });

  }

  create(
    email: string,
    passwordHash: string,
  ) {

    const user = this.userRepository.create({
      email: email,
      hashedpassword: passwordHash,
    });

    return this.userRepository.save(user);
  }
}