import { NextFunction, Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import userRepository from "../../repositories/user.repository";
import bearerAutheticationMiddleware from "../middlewares/bearer-authentication.middleware";

const usersRoute = Router();

usersRoute.get(
  "/users",
  bearerAutheticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

usersRoute.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepository.findByUuid(uuid);

      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const NewUser = req.body;
    const uuid = await userRepository.createUser(NewUser);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

usersRoute.put(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepository.updateUser(modifiedUser);

    res.sendStatus(StatusCodes.OK).send(modifiedUser);
  }
);

usersRoute.delete(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.removeUser(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;
