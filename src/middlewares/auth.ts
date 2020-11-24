import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"];
  if (!token) res.status(401).json({ message: "token required" });
  const bearer: string = token.split("Bearer ")[1];
  await jwt.verify(bearer, req.app.get("jwt-secret"), (err, decoded) => {
    if (err) res.status(403).json({ message: err.message });
    req["decoded"] = decoded;
    next();
  });
};
