import { NextFunction, Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import userRepository from "../../repositories/user.repository";

const usersRoute = Router();

usersRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

usersRoute.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRepository.findByUuid(uuid);

    res.status(StatusCodes.OK).send(user);
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
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    res.sendStatus(StatusCodes.OK).send(modifiedUser);
  }
);

usersRoute.delete(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;
