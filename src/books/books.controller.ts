import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BooksService } from './books.service';
import  { CreateBooks } from './books_create.dto';
import  { UpdateBook } from './books_updatebook.dot';

@Controller('books')
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe ({
  whitelist: true ,
  forbidNonWhitelisted:true
}))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}


@Get('search/:value')
search(@Param('value')value: string)
{
  return this.booksService.search(value);
}

@Get("getbook")
findbook(@Query("name") name : string){
  return this.booksService.getbook(name);

}
@Get("filter")
filtering(
   @Query("booktype") booktype:string,
   @Query('price') price:string
){
  return this.booksService.filtering(booktype,Number(price))
}

@Post('change-price')
ChangePrice(
  @Body('id') id:string,
  @Body('newprice') newprice:string
)
{
  return this.booksService.change_price(Number(id)-1,Number(newprice));
}

@Post('addbook')
@UsePipes( new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true
}))
addnewbook(@Body()body:CreateBooks)
{
return this.booksService.addbook(body);
}

@Get('fliterbyprice')
filterbyprice(@Query('min')min: string ,@Query('max')max: string)
{
  return this.booksService.filterbyprice(Number(min),Number(max))
}

@Delete("deleteBook/:id")
deletebook(@Param('id')id:string){
  return this.booksService.deletebook(Number(id));

}

@Get("listall")
returnallbook()
{
  return this.booksService.listarray();
}

@Patch("updatebook/:id")
updatebook(
  @Param('id',ParseIntPipe)id: number ,
  @Body()body:UpdateBook)
            {
  return this.booksService.updatebook(id,body);
            }



@Get("serachaboutbook/:id")
searchaboutbook(@Param('id',ParseIntPipe)id:number){
  return this.booksService.serachaboutbook(id)
}
}
