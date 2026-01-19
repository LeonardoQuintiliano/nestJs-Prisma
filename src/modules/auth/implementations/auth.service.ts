import { PrismaService } from "src/database/PrismaService";
import { LoginInput, LoginOutput } from "../dto/login.dto";
import { IAuthService } from "../interfaces/auth.service.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements IAuthService {
    constructor(private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}
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

            const payload = {
                sub: user.id,
                email: user.email,
                role: user.role,
            };

            const accessToken = this.jwtService.sign(payload);

            return {
                access_token: accessToken,
                expires_in: 3600,
            };
        } catch (error) {
            throw error;
        }
    }
}