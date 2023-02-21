import { Request } from 'express';

export type UserData = {
    id: string
}

export interface AuthRequest extends Request {
    userData: UserData
}