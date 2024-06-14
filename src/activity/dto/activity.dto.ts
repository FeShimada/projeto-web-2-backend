import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateActivityDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsInt()
    createdById: number;
}

export class AssignActivityDto {
    @ApiProperty()
    @IsInt()
    activityId: number;

    @ApiProperty()
    @IsInt()
    userId: number;
}
