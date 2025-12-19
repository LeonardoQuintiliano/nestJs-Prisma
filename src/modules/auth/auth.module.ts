import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { AuthService } from "./implementations/auth.service";
import { AuthController } from "./implementations/auth.controller";

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}