import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = res.statusCode! == 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Erro interno do servidor.",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
