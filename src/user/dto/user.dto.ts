
import { IsEmail, IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import UserRole from "src/helpers/UserRole";


export class CreateUserDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    role: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class UpdateRoleDto {
    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;
}
