import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { UserController } from "./implementations/user.controller";
import { UserService } from "./implementations/user.service";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}