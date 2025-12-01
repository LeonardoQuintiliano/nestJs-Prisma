import { BookDTO } from "src/modules/book/dto/book.dto";

export type UserDto = {
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    books: BookDTO[];
}