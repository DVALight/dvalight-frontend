import { User } from "./user";

export interface LoginRequest {
  email: string
  password: string
}

export interface Tokens {
  accesseToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: User
  tokens: Tokens
}