import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);

    res.status(201);
    return res.json({ token: token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    return res.json({ message: "Invalid username or password" });
  }

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    return res.json({ message: "Invalid username or password" });
  }

  const token = createJWT(user);
  res.status(200);
  return res.json({ token: token });
};

export { createNewUser, signin };
