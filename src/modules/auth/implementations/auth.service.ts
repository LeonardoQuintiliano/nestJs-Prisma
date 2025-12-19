import { PrismaService } from "src/database/PrismaService";
import { LoginInput, LoginOutput } from "../dto/login.dto";
import { IAuthService } from "../interfaces/auth.service.interface";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
    constructor(private readonly prisma: PrismaService) {}
    async login(data: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                },
            });

            if(!user) {
                throw new UnauthorizedException("Invalid email");
            }

            const validPassword = await bcrypt.compare(data.password, user.password);

            if (!validPassword) {
                throw new UnauthorizedException("Invalid password");
            }

            return {
            access_token: 'fake-token-for-now',
            expires_in: 3600,
            };
        } catch (error) {
            throw error;
        }
    }
}