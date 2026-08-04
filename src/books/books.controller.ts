import { Controller,Get, Param,Query,Post, Body, Patch, Delete} from '@nestjs/common';
import { BooksService } from './books.service';
import  { CreateBooks } from './books_create.dto';
import  { UpdateBook } from './books_updatebook.dot';

@Controller('books')
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
  @Param('id')id: string ,
  @Body()body:UpdateBook)
            {
  return this.booksService.updatebook(Number(id),body);
            }
}
