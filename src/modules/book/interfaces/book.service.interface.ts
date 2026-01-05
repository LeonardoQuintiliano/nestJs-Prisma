import { BookDTO } from "../dto/book.dto";
import { CreateBookDto, UpdateBookDto } from "../dto/createBook.dto";

export interface IBookService {
    create(data: CreateBookDto, userId: string): Promise<BookDTO>;
    findAll(): Promise<BookDTO[]>;
    findOne(id: string): Promise<BookDTO>;
    update(id: string, data: UpdateBookDto, userId: string) :Promise<BookDTO>;
    delete(id: string): Promise<string>;
}