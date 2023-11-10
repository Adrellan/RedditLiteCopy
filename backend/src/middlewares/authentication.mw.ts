/*
* TODO: Implement a authentication middleware with JWT.
*  The JWT will come from TWO cookies.
*  AUTH_TOKEN -> This will contain the payload the JWT Header and Payload Data
*  AUTH_SIGNATURE -> This will contain the JWT signature part.
*  Responsible user: Daniella
*
* */
import {Request, Response, NextFunction } from 'express';


const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

export const authenticationMiddleware = ((req: Request & { user?: { username: string } }, res: Response, next: NextFunction) => {

  const authToken = req.cookies.AUTH_TOKEN as string;
  const authSignature = req.cookies.AUTH_SIGNATURE as string;

  if (!authToken || !authSignature) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(`${authToken}.${authSignature}`, process.env.JWT_SECRET_KEY) as { username: string };
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(403); 
  }
});
