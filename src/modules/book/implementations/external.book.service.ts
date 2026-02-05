import axios from "axios";
import { IExternalBookService } from "../interfaces/external.book.service.interface";
import { PrismaService } from "src/database/PrismaService";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExternalBookService implements IExternalBookService {
    constructor(private prisma: PrismaService) {}
    async importBookData(isbn: string, userId: string): Promise<any> {
        try {
            const baseUrl = "https://openlibrary.org/isbn";
            const response = await axios.get(
                `${baseUrl}/${isbn}.json`
            );

            console.log("Data received by openlibrary: ", response);

            const bookData = this.mapOpenLibraryToBookModel(response, userId);
            console.log("Body formatted to prisma: ", bookData);

            return await this.prisma.book.create({
                data: bookData
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    private mapOpenLibraryToBookModel(data: any, userId: string) {
        return {
            name: data.name,
            description: data.description,
            author: data.author,
            bar_code: data.bar_code,
            ownerId: userId,
        };
    }
}