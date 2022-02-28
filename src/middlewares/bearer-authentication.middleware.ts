import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/Errors/fobbiden.error.model";
import userRepository from "../../repositories/user.repository";
async function bearerAutheticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas !");
    }

    const [autheticationType, token] = authorizationHeader.split(" ");
    if (autheticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de Autenticação inválida !");
    }

    const tokenPayload = JWT.verify(token, "teste");

    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
      throw new ForbiddenError("Token Inválido! ");
    }

    const uuid = tokenPayload.sub;

    const user = await userRepository.findByUuid(uuid);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
export default bearerAutheticationMiddleware;
