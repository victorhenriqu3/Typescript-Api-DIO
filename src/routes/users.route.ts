import StatusCodes from "http-status-codes";
import { Router, Request, Response, NextFunction } from "express";

const usersRoute = Router();

usersRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: "Victor" }];
  res.status(StatusCodes.OK).send(users);
});

usersRoute.get(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
  }
);

usersRoute.post("/users", (req: Request, res: Response, next: NextFunction) => {
  const NewUser = req.body;
  console.log(NewUser);

  res.status(StatusCodes.CREATED).send(NewUser);
});

export default usersRoute;
