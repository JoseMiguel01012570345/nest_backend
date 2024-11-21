import { IsEmail, IsString } from "class-validator";

export class registerDTO{

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string

}