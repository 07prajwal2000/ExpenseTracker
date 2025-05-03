import { NextFunction, Request, Response } from "express";

export function authenticated(request: Request, response: Response, next: NextFunction) {
  response.locals.userId = "0196794c-b79a-7523-a6ef-db00fde0dbca";
  // TODO: verify token
  next();
}