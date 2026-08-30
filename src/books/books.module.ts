import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module'; // ← هون المكان الصحيح لهاد السطر

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entits';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
