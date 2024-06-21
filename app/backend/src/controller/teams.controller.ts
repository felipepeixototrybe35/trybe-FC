import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  constructor(private service: TeamService = new TeamService()) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const allTeams = await this.service.getAll();
    res.status(200).json(allTeams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.getById(Number(id));
    return res.status(200).json(team);
  }
}
