import { isNotEmpty, IsNotEmpty,IsNumber,IsString } from "class-validator";



export class CreateBooks
{
@IsNotEmpty()
@IsString()
name!: string;

@IsNotEmpty()
@IsNumber()
price!:number;


@IsNotEmpty()
@IsString()
type!:string;







}