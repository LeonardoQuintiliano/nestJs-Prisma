import { CreateUserDto } from "../dto/createUser.dto";
import { UserDto } from "../dto/user.dto";

export interface IUserController {
    create(data: CreateUserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: string): Promise<UserDto>;
    update(id: string, data: CreateUserDto): Promise<UserDto>;
    delete(id: string): Promise<string>;
}