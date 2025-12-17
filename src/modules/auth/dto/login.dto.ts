import { IsString } from "class-validator";

export type LoginOutput = {
    access_token: string;
    expires_in: number;
}

export class LoginInput {
    @IsString()
    email: string;

    @IsString()
    password: string;
}