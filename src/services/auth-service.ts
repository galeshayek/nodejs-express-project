import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IJWTPayload } from "../@types/@types";
import { Logger } from "../logs/logger";
//security methods 
export const authService = {
  hashPassword: (plainTextPassword: string, rounds = 12) => {
    return bcrypt.hash(plainTextPassword, rounds);
  },

  comparePassword: (plainTextPassword: string, hash: string) => {
    return bcrypt.compare(plainTextPassword, hash);
  },

  generateJWT: (payload: IJWTPayload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      Logger.log("JWT_SECRET must be included in .env file");
    }
    return jwt.sign(payload, secret);
  },

  validateJWT: (token: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      Logger.log("JWT_SECRET must be included in .env file");
    }

    const payload = jwt.verify(token, secret) as IJWTPayload;

    return payload;
  }
};
