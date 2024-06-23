import { Router } from 'express';
import teamRouter from './teams.router';
import usersRouter from './users.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', usersRouter);

export default router;
