import express from "express";
import * as dotenv from "dotenv";
import { AppError } from "../model/constants/AppError";
import { User } from "../model/entity/User";
//import { UserResponse } from "../model/response/UserResponse";
import * as userService from "../services/userService";
import jwt from 'jsonwebtoken';
const router = express.Router();
dotenv.config();

router.get("/:userEmail", async (req, res, next) => {
  const user: User | null = await userService.getUserbyEmail(
    req.params.userEmail
  );
  if (!user) {
    return next(new AppError("Invalid email!", 400));
  }
  res.json({uspjeh: 'da'});
});

router.post("/login",async (req, res, next) => {
  let user : User | null = await userService.getUserbyEmail(req.body.email);
  if(!user){
    return next(new AppError("Invalid email!", 400));
  }
  if(user.password != req.body.password){
    return next(new AppError("Invalid password!", 401));
  }
  const token = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_KEY as string);
  res.json({token: token});
})

module.exports = router;