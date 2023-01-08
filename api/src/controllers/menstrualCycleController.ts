import express from "express";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/constants/AppError";
import * as menstrualCycleService from "../services/menstrualCycleService";
import * as jwtService from "../services/jwtService";
const router = express.Router();

router.get(
  "/dates",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(await menstrualCycleService.getDates(jwt.id));
    }
    return next(new AppError("Invalid token!", 400));
  }
);

router.get(
  "/optionRemovePeriod/:date",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(
        await menstrualCycleService.canRemovePeriod(
          jwt.id,
          new Date(req.params.date)
        )
      );
    }
    return next(new AppError("Invalid token!", 400));
  }
);

router.get(
  "/optionEndPeriod/:date",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(
        await menstrualCycleService.canEndPeriod(
          jwt.id,
          new Date(req.params.date)
        )
      );
    }
    return next(new AppError("Invalid token!", 400));
  }
);

router.get(
  "/optionAddPeriod/:date",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(
        await menstrualCycleService.canAddPeriod(
          jwt.id,
          new Date(req.params.date)
        )
      );
    }
    return next(new AppError("Invalid token!", 400));
  }
);

router.get(
  "/removePeriod/:date",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(await menstrualCycleService.RemovePeriod(jwt.id));
    }
    return next(new AppError("Invalid token!", 400));
  }
);

router.get(
  "/endPeriod/:date",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(
        await menstrualCycleService.EndPeriod(jwt.id, new Date(req.params.date))
      );
    }
    return next(new AppError("Invalid token!", 400));
  }
);

router.get(
  "/addPeriod/:date",
  async (req: Request, res: Response, next: NextFunction) => {
    let jwt = jwtService.authenticateToken(req);
    if (jwt) {
      return res.json(
        await menstrualCycleService.AddPeriod(jwt.id, new Date(req.params.date))
      );
    }
    return next(new AppError("Invalid token!", 400));
  }
);

module.exports = router;
