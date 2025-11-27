import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';
import { CreateBookDto } from './dto/createBook.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: CreateBookDto){
    return this.bookService.create(data);
  }

  @Get()
  async findAll(){
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.bookService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateBookDto){
    return this.bookService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string){
    return this.bookService.delete(id);
  }
}
