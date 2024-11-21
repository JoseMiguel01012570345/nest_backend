import { User } from "./auth.entity";

export interface LoginResponse{
    user: User
    token: string
    
}