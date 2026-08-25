import { IsNotEmpty,IsString,IsNumber ,IsOptional} from "class-validator";

export class UpdateBook{
@IsOptional()
@IsString()
name?:string;

@IsOptional()
@IsNumber()
price?:number;

@IsOptional()
@IsString()
type?:string;


}