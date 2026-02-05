import { Controller, Post, Query, UseGuards } from "@nestjs/common";
import { IExternalBookController } from "../interfaces/external.book.controller.interface";
import { ExternalBookService } from "./external.book.service";
import { CurrentUser } from "src/modules/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/modules/auth/jwt/jwt-auth.guard";

@Controller()
export class ExternalBookController implements IExternalBookController {
    constructor(private bookService: ExternalBookService) {}

    @UseGuards(JwtAuthGuard)
    @Post('books/import')
    async importBookData(@Query('isbn') isbn: string, @CurrentUser() user): Promise<any> {
        return await this.bookService.importBookData(isbn, user.sub);
    }
}