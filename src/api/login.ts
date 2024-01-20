import { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Tokens {
  accesseToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export function isLoginResponse(data: any): data is LoginResponse {
  return ("user" in data && "tokens" in data);
}
