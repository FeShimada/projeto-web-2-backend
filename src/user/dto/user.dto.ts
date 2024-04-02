import { IsEmail, IsString, IsInt } from "class-validator";



export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsInt()
    role: number;

    @IsString()
    password: string;
}
