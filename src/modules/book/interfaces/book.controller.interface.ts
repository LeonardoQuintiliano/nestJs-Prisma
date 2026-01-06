import { AuthUser } from "src/modules/auth/dto/auth.dto";
import { BookDTO } from "../dto/book.dto";
import { CreateBookDto, UpdateBookDto } from "../dto/createBook.dto";

export interface IBookController {
    create(data: CreateBookDto, userId: string): Promise<BookDTO>;
    findAll(): Promise<BookDTO[]>;
    findOne(id: string, user: AuthUser): Promise<BookDTO>;
    update(id: string, data: UpdateBookDto, user: AuthUser): Promise<BookDTO>;
    delete(id: string, user: AuthUser): Promise<string>;
}