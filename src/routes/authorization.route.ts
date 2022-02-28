import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import basicAutheticationMiddleware from "../middlewares/basic-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  basicAutheticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = JWT.sign({}, "teste", {
        audience: "consumer-uuid or api key",
        subject: req.user?.uuid,
      });

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
