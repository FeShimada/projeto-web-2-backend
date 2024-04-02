import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, ValidateNested } from "class-validator";

export class CreateArticleDto {

    @IsString()
    title: string;

    @IsString()
    summary: string;

    @IsString()
    pdfLink: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserId)
    authors: UserId[];
}

export class EditArticleAuthorDto {

    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    summary: string;

    @IsString()
    pdfLink: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserId)
    authors: UserId[];
}

class UserId {
    @IsInt()
    id: number;
}