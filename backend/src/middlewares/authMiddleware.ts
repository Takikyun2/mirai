import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // pega o token da requisição

  if (!token) {
    res.status(401).json({ message: "Acesso negado. Token não encontrado." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreta");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido." });
    return;
  }
};
