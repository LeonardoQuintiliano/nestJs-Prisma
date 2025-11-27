import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO){
    return this.bookService.update(id, data);
  }
}
