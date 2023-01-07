import express from "express";
import { AppError } from "../model/constants/AppError";
import * as medicalExamService from "../services/medicalExamService";
import * as jwtService from "../services/jwtService";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));
  return res.json(await medicalExamService.getMedicalExams(jwtTokenResult.id));
});

module.exports = router;
