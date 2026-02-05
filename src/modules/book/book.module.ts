import { Module } from '@nestjs/common';
import { BookService } from './implementations/book.service';
import { BookController } from './implementations/book.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { ExternalBookService } from './implementations/external.book.service';
import { ExternalBookController } from './implementations/external.book.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BookController, ExternalBookController],
  providers: [BookService, ExternalBookService]
})
export class BookModule {}
