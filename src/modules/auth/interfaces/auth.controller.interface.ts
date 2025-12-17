import { LoginInput, LoginOutput } from "../dto/login.dto";

export interface IAuthController {
    login(data: LoginInput): Promise<LoginOutput>;
}