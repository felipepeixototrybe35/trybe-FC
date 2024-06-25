import { Router } from 'express';
import MatchesController from '../controller/matches.controller';
import UserMiddleware from '../middlewares/usersMiddleware';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));

matchesRouter.patch(
  '/:id/finish',
  UserMiddleware.validateToken,
  (req, res) => matchesController.finish(req, res),
);

matchesRouter.patch(
  '/:id',
  UserMiddleware.validateToken,
  (req, res) => matchesController.upDate(req, res),
);

matchesRouter.post(
  '/',
  UserMiddleware.validateToken,
  (req, res) => matchesController.postMatch(req, res),
);

export default matchesRouter;
