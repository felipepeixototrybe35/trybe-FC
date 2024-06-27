import { Router } from 'express';
import teamRouter from './teams.router';
import usersRouter from './users.router';
import matchesRouter from './matches.router';
import leaderBoardRouter from './leaderBoard.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
