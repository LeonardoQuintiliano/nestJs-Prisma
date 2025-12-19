import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [BookModule, UserModule, AuthModule],
})
export class AppModule {}
