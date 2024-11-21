import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateUserhDto {

    @IsEmail()
    public email: string
    
    @IsString()
    public name: string

    @MinLength(6)
    public password: string

}
