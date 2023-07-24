import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: BookDTO){
    return this.bookService.create(data);
  }

  @Get()
  async findAll(){
    return this.bookService.findAll();
  }
}
