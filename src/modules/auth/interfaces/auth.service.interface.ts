import { LoginInput, LoginOutput } from "../dto/login.dto";

export interface IAuthService {
    login(data: LoginInput): Promise<LoginOutput>;
}