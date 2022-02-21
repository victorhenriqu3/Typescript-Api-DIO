import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import userRepository from "../../repositories/user.repository";
import ForbiddenError from "../models/Errors/fobbiden.error.model";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers["authorization"];

      if (!authorizationHeader) {
        throw new ForbiddenError("Credenciais não informadas !");
      }

      const [autheticationType, token] = authorizationHeader.split(" ");
      if (autheticationType !== "Basic" || !token) {
        throw new ForbiddenError("Tipo de Autenticação inválida !");
      }

      const tokenContent = Buffer.from(token, "base64").toString("utf-8");
      const [username, password] = tokenContent.split(":");
      

      if (!username || !password) {
        throw new ForbiddenError("Crendenciais não preenchidas!");
      }

      const user = await userRepository.findByUsernameAndPassword(
        username,
        password
      );

      

      if (!user) {
        throw new ForbiddenError("usuario ou senha invalido");
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
