import { Module } from '@nestjs/common';
import { BookService } from './implementations/book.service';
import { BookController } from './implementations/book.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
