import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderController {
  constructor(
    private service: LeaderBoardService = new LeaderBoardService(),
  ) { }

  async getHome(_req: Request, res: Response) {
    const matches = await this.service.leaderBoardHome();
    return res.status(200).json(matches);
  }

  async getAway(_req: Request, res: Response) {
    const matches = await this.service.leaderBoardAway();
    return res.status(200).json(matches);
  }
}
