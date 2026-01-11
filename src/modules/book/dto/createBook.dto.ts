import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsString()
    author: string;
    
    @IsString()
    bar_code: string;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}

export class TransferBookOwnershipDto {
    @IsString()
    newOwnerId: string;
}