
import { IsEmail, IsString, IsInt, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


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

export class AssignArticleToMeasurerDto {

    @IsInt()
    id: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ArticleId)
    articles: ArticleId[];
}

class ArticleId {
    @IsInt()
    id: number;
}

export class EditUserDto {

    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsInt()
    role: number;
}
