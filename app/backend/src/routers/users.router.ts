import { Router } from 'express';
import UserController from '../controller/users.controller';
import UserMiddleware from '../middlewares/usersMiddleware';

const usersRouter = Router();

const usersController = new UserController();

usersRouter.post(
  '/',
  UserMiddleware.validateLogin,
  (req, res) => usersController.postUser(req, res),
);
usersRouter.get(
  '/role',
  UserMiddleware.validateToken,
  (req, res) => usersController.getRole(req, res),
);

export default usersRouter;
