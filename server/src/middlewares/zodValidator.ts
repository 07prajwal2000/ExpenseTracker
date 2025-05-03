import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function zodValidator(schema: ZodSchema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {      
      response.status(400).json({
        message: "Invalid body",
      });
      return;
    }
    next();
  };
}