import { Controller, Post } from "@nestjs/common";
import { LoginInput, LoginOutput } from "../dto/login.dto";
import { IAuthController } from "../interfaces/auth.controller.interface";
import { AuthService } from "./auth.service";

@Controller('login')
export class AuthController implements IAuthController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    async login(data: LoginInput): Promise<LoginOutput> {
        return this.authService.login(data);
    }
}