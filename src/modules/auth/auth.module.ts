import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { AuthService } from "./implementations/auth.service";
import { AuthController } from "./implementations/auth.controller";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [PrismaModule, 
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN as any,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}