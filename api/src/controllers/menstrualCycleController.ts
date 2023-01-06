import express from "express";
import { AppError } from "../model/constants/AppError";
import * as menstrualCycleService from "../services/menstrualCycleService";
import * as jwtService from "../services/jwtService";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));

  return res.json(
    await menstrualCycleService.getMenstrualCycleByUserId(jwtTokenResult.id)
  );
});

router.get("/optionRemovePeriod/:date", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));
  return res.json(
    await menstrualCycleService.canRemovePeriod(
      jwtTokenResult.id,
      new Date(req.params.date)
    )
  );
});

router.get("/optionEndPeriod/:date", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));

  return res.json(
    await menstrualCycleService.canEndPeriod(
      jwtTokenResult.id,
      new Date(req.params.date)
    )
  );
});

router.get("/optionAddPeriod/:date", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));

  return res.json(
    await menstrualCycleService.canAddPeriod(
      jwtTokenResult.id,
      new Date(req.params.date)
    )
  );
});

router.get("/removePeriod", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));
  return res.json(await menstrualCycleService.RemovePeriod(jwtTokenResult.id));
});

router.get("/endPeriod/:date", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));
  return res.json(
    await menstrualCycleService.EndPeriod(
      jwtTokenResult.id,
      new Date(req.params.date)
    )
  );
});

router.get("/addPeriod/:date", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(new AppError("Invalid token!", 400));
  let jwtTokenResult = jwtService.authenticateToken(token);
  if (jwtTokenResult == null) return next(new AppError("Invalid token!", 400));

  return res.json(
    await menstrualCycleService.AddPeriod(
      jwtTokenResult.id,
      new Date(req.params.date)
    )
  );
});

module.exports = router;
