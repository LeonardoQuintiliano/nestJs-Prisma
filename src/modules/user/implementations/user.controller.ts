import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserDto } from "../dto/user.dto";
import { IUserController } from "../interfaces/user.controller.interface";
import { UserService } from "./user.service";

@Controller('users')
export class UserController implements IUserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDto): Promise<UserDto> {
        return this.userService.create(data);
    }

    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateUserDto) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<string> {
        return this.userService.delete(id);
    }
    
}