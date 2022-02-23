import { NextFunction, Request, Response } from "express";
import userRepository from "../../repositories/user.repository";
import ForbiddenError from "../models/Errors/fobbiden.error.model";

export default async function basicAutheticationMiddleware(
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

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
