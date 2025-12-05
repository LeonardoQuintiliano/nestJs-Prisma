import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserDto } from "../dto/user.dto";
import { IUserService } from "../interfaces/user.service.interface";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class UserService implements IUserService {
    constructor(private prisma: PrismaService){}
    
    private mapUserToDto(u: any): UserDto {
        return {
          id: u.id,
          email: u.email,
          name: u.name ?? null,
          role: u.role,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
          books: (u.books || []).map(b => ({
            id: b.id,
            name: b.name,
            description: b.description,
            author: b.author,
            bar_code: b.bar_code,
            ownerId: b.ownerId ?? null,
            createdAt: b.createdAt,
            updatedAt: b.updatedAt,
          })),
        };
    }
    
    async create(data: CreateUserDto): Promise<UserDto> {
        try {
            const user = await this.prisma.user.create({
                data
            });

            return this.mapUserToDto(user);
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAll(): Promise<UserDto[]> {
        try {
            const users = await this.prisma.user.findMany({ include: { books: true }});
            return users.map(u => this.mapUserToDto(u));
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(id: string): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, data: CreateUserDto) {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}