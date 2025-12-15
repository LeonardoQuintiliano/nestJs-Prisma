import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    role?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}