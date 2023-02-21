import express from 'express';
// import { Request, Response, NextFunction } from 'express';
// import { AppError } from '../model/constants/AppError';
// import { User } from '../model/entity/User';
import { authenticateUser } from '../auth/authenticateUser';
const router = express.Router();

router.use( authenticateUser );

export default router;
