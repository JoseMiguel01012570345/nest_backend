import { IsEmail, MinLength } from "class-validator";

export class loginDTO{

    @IsEmail()
    email: string;
    
    @MinLength(6)
    password:string;

}