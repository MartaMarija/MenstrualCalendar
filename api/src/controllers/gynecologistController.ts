import express from "express";
import { Gynecologist } from "../model/entity/Gynecologist";
import { AppError } from "../model/constants/AppError";
import * as medicalExamService from "../services/gynecologistService";
import * as jwtService from "../services/jwtService";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));
  return res.json(await medicalExamService.getGynecologist(jwtTokenResult.id));
});

router.post("/addGyn", async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return next(new AppError("Invalid token!", 400));
    let jwtTokenResult = jwtService.authenticateToken(token);
    if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));
    let gyn : Gynecologist = new Gynecologist();
    gyn.first_name=req.body.firstName;
    gyn.last_name=req.body.lastName;
    gyn.address=req.body.address;
    gyn.telephone=req.body.telephone;
    return res.json(await medicalExamService.insertGynecologist(jwtTokenResult.id, gyn));
  });

module.exports = router;