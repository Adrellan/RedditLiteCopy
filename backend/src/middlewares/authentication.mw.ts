/*
* TODO: Implement a authentication middleware with JWT.
*  The JWT will come from TWO cookies.
*  AUTH_TOKEN -> This will contain the payload the JWT Header and Payload Data
*  AUTH_SIGNATURE -> This will contain the JWT signature part.
*  Responsible user: Daniella
*
* */
import {Request, Response, NextFunction } from 'express';
import { jwtSecret } from '../config/jwtSecretKey.generator';

const jwt = require('jsonwebtoken');


export const authenticationMiddleware = (
  req: Request & { user?: { username: string } },
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies?.AUTH_TOKEN as string;
  const authSignature = req.cookies?.AUTH_SIGNATURE as string;

  console.log('authToken:', authToken);
  console.log('authSignature:', authSignature);

  if (!authToken || !authSignature) {
      console.log("nem vagy bejelentkezve");
    return res.sendStatus(401);
  }
  try {
      const decoded = jwt.verify(`${authToken}.${authSignature}`, jwtSecret) as { username: string };
      req.user = decoded;
      
      next();
  } catch (error) {
      console.error('JWT Verification Error:', error);
      return res.sendStatus(403);
  }
};