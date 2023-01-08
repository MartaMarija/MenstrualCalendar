import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request } from "express";
dotenv.config();

export interface jwtData {
  id: string;
  iat: number;
}

export function getToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_KEY as string);
}

export function authenticateToken(req: Request) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return null;
    let jwtTokenResult = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY as string
    ) as jwtData;
    return jwtTokenResult;
  } catch {
    return null;
  }
}
