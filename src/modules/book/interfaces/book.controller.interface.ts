import { BookDTO } from "../dto/book.dto";
import { CreateBookDto } from "../dto/createBook.dto";

export interface IBookController {
    create(data: CreateBookDto): Promise<BookDTO>;
    findAll(): Promise<BookDTO[]>;
    findOne(id: string): Promise<BookDTO>;
    update(id: string, data: CreateBookDto);
    delete(id: string): Promise<string>;
}