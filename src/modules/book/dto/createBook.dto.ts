import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsString()
    author: string;
    
    @IsString()
    bar_code: string;
    
    @IsOptional()
    @IsString()
    ownerId?: string;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}