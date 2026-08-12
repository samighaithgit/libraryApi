import { Injectable } from '@nestjs/common';
import  { UpdateBook } from './books_updatebook.dot';
import { InjectRepository } from '@nestjs/typeorm';
import  { Book } from './books.entits';
import type { Repository } from 'typeorm/browser';

@Injectable()
export class BooksService {
constructor(
@InjectRepository(Book)
private readonly bookrepository:Repository<Book>
){
}


async listarray()
{
    return await this.bookrepository.find();
}

addbook(body:any)
{
    const newbook =this.bookrepository.create({
       
        name:body.name,
        type:body.type,
        price:body.price
    })
    return this.bookrepository.save(newbook);
}

async serachaboutbook(id:number)
{

    const book = await this.bookrepository.findOneBy({id:id});
    if(!book){
        return "no book with this id";
    }
    return book;

}


async updatebook(id:number ,body:UpdateBook)
{

const book = await this.bookrepository.findOneBy({id:id});
 
if(!book){
    return "no book with this id";
}
if(body.name)
{
    book.name = body.name;
}
if(body.type)
{
    book.type = body.type;
}
if(body.price !== undefined)
{
    book.price = body.price;
}
  return  this.bookrepository.save(book);


}

async deletebook(id:number)
{
  const result = await this.bookrepository.delete(id);
  if(result.affected === 0){
    return "no book with this id ";
}
return result;
}


private books =[
    {
        id:1,
        name:"book1",
        type:"math",
        price:10
    },
    {
        id:2,
        name:"book2",
        type:"history",
        price:200
    },
    {
        id:3,
        name:"book3",
        type:"arabic",
        price:300
    },
    {
        id:4,
        name:"book4",
        type:"english",
        price:10
    },
    {
        id:5,
        name:"boo5",
        type:"math",
        price:10
        
    },
    
    
]

search(value:string){
   
    const searchid= this.books.find((book)=> {
        return book.id === Number(value)  || book.name ===value
    })
   
    if(searchid){
        return searchid;
    }
    else {return "No book found with this value"}
}

getbook(name:string){
    return this.books.find((book)=>book.name === name )
}

filtering(booktype:string,price:number)
{
    const filterbook = this.books.filter((book)=>{
        return book.type ===booktype && book.price === price 
    })
    
    if(filterbook.length > 0){
        return filterbook;
    }
    else {
        return "No book found with this filter"
    }
}
change_price(id:number,newprice:number)
{
     this.books[id].price =newprice;
     return this.books[id];
}



filterbyprice(minpri:number,maxpri:number)
{
    const filtered = this.books.filter(
        (book) => {
            return book.price >= minpri && book.price <= maxpri
        }
    )
    if(filtered.length > 0){
        return filtered;
    }
    else {
        return "NO book found in this price range"
    }

    
}






}
