import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
};

const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Not Valid Token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req["user"] = user;
    next();
  } catch (e) {
    console.error("Error authenticating: ", e);
    res.status(401);
    res.json({ message: "Not Valid Token" });
    return;
  }
};

export { createJWT, protect, comparePassword, hashPassword };
