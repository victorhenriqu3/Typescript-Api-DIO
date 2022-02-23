import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import userRepository from "../../repositories/user.repository";
import basicAutheticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/Errors/fobbiden.error.model";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  basicAutheticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new ForbiddenError("Usuario não informado");
      }
      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const jwtSecret = "my_secret_key";
      const jwt = JWT.sign(jwtPayload, jwtSecret, jwtOptions);
      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
