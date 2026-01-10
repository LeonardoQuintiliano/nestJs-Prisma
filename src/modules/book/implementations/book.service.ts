import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BookDTO } from '../dto/book.dto';
import { PrismaService } from 'src/database/PrismaService';
import { CreateBookDto, UpdateBookDto } from '../dto/createBook.dto';
import { Prisma } from '@prisma/client';
import { IBookService } from '../interfaces/book.service.interface';
import { AuthUser } from 'src/modules/auth/dto/auth.dto';

@Injectable()
export class BookService implements IBookService {
    constructor(private prisma: PrismaService){}
    async create(data: CreateBookDto, userId: string): Promise<BookDTO> {
       try {
        const book = await this.prisma.book.create({
            data: {
                ...data,
                ownerId: userId
            }
        });
        return book;
       } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new ConflictException('Book with this bar_code already exists');
        }
        throw error;
       }
    }

    async findAll(user: AuthUser): Promise<BookDTO[]>{
        if (user.role === "admin"){
            return this.prisma.book.findMany({
                orderBy: { createdAt: 'desc' }
            });
        } 
        
        return this.prisma.book.findMany({
            where: {
                ownerId: user.sub
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
    }

    async findOne(id: string, user: AuthUser): Promise<BookDTO>{
        const book = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        if (!book) {
            throw new NotFoundException("Book does not exist");
        }

        if (user.role === "admin" || book.ownerId === user.sub) {
            return book;
        } else {
            throw new ForbiddenException("You are not allowed to consult this book");
        }  
    }

    async update(id: string, data: UpdateBookDto, user: AuthUser): Promise<BookDTO>{
        const book = await this.findOne(id, user);

        if (user.role === "admin" || book.ownerId === user.sub){
            return await this.prisma.book.update({
                data,
                where: {
                    id,
                },
            });
        } else {
            throw new ForbiddenException("You are not allowed to update this book");
        }
    }

    async delete(id: string, user: AuthUser): Promise<string>{
        const book = await this.prisma.book.findUnique({ where: { id } });
        if (!book) throw new NotFoundException('Book not found');

        if (user.role === "admin" || book.ownerId === user.sub) {
            await this.prisma.book.delete({
                where: {
                    id
                },
            });

            return `Book with Id ${id} deleted successfully`;
        } else {
            throw new ForbiddenException("You are not allowed to delete this book");
        } 
    }
}
