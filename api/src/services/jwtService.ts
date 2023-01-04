import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

export interface jwtData{
  id : string,
  iat : number
}

export function getToken(userId: string) {
    return jwt.sign({id: userId}, process.env.ACCESS_TOKEN_KEY as string);
  }

export function authenticateToken(token: string) {
  try{
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string) as jwtData
  } catch{
    return null
  }
}
