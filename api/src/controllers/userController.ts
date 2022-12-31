import express from "express";
import { AppError } from "../model/constants/AppError";
import { User } from "../model/entity/User";
import { UserResponse } from "../model/response/UserResponse";
import * as userService from "../services/userService";

const router = express.Router();

router.get("/:userEmail", async (req, res, next) => {
  const user: User | null = await userService.getUserbyEmail(
    req.params.userEmail
  );
  if (!user) {
    return next(new AppError("Invalid email!", 400));
  }
  res.json(UserResponse.toDto(user));
});

module.exports = router;