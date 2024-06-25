import { Router } from 'express';
import teamRouter from './teams.router';
import usersRouter from './users.router';
import matchesRouter from './matches.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;
