import { Router } from 'express';
import LeaderController from '../controller/leaderBoard.controller';

const leaderBoardRouter = Router();

const leaderBoardController = new LeaderController();

leaderBoardRouter.get('/home', (req, res) => leaderBoardController.getHome(req, res));
leaderBoardRouter.get('/away', (req, res) => leaderBoardController.getAway(req, res));

export default leaderBoardRouter;
