import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from '../dto/book.dto';
import { CreateBookDto, UpdateBookDto } from '../dto/createBook.dto';
import { IBookController } from '../interfaces/book.controller.interface';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';

@Controller('books')
export class BookController implements IBookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateBookDto, @CurrentUser() user): Promise<BookDTO>{
    return this.bookService.create(data, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<BookDTO[]>{
    return this.bookService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user): Promise<BookDTO>{
    return this.bookService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateBookDto, @CurrentUser() user): Promise<BookDTO>{
    return this.bookService.update(id, data, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user): Promise<string>{
    return this.bookService.delete(id, user);
  }
}