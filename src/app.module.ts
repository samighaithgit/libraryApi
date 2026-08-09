import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'123456',
    database:'library_db2',
    autoLoadEntities:true,
    synchronize:true  }), BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
