import axios from "axios";
import { IExternalBookService } from "../interfaces/external.book.service.interface";
import { PrismaService } from "src/database/PrismaService";
import { Injectable } from "@nestjs/common";
import { connect } from "http2";

@Injectable()
export class ExternalBookService implements IExternalBookService {
    constructor(private prisma: PrismaService) {}
    async importBookData(isbn: string, userId: string): Promise<any> {
        try {
            const baseUrl = "https://openlibrary.org/isbn";
            const response = await axios.get(
                `${baseUrl}/${isbn}.json`
            );

            console.log("Data received by openlibrary: ", response.data);

            const bookData = this.mapOpenLibraryToBookModel(response.data, userId);
            console.log("Body formatted to prisma: ", bookData);

            return await this.prisma.book.create({
                data: {
                    ...bookData,
                    ownerId: userId
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    private mapOpenLibraryToBookModel(data: any, userId: string) {
        return {
            name: data.title,
            description: `Published in ${data.publish_date} by ${data.publishers[0]}`,
            author: data.author || "unknown",
            bar_code: data.isbn_10[0],
            ownerId: userId,
        };
    }
}