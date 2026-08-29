import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entits';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
  TypeOrmModule.forFeature([Book]),
  AuthModule,
  JwtModule,
],
controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
