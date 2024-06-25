import { Request, Response } from 'express';
import { validateTeam, validateMatch } from '../middlewares/matchesMiddleware';
import { IMatches } from '../Interfaces/IMatches';
import MatchService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private service: MatchService = new MatchService(),
  ) { }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const { inProgress } = _req.query;
    const matches = await this.service.getAll();

    if (!inProgress) {
      return res.status(200).json(matches);
    }
    if (inProgress === 'true') {
      const matchesInProgress = matches
        .filter((match: { inProgress: boolean; }) => match.inProgress === true);
      return res.status(200).json(matchesInProgress);
    }
    const matchesFinish = matches
      .filter((match: { inProgress: boolean; }) => match.inProgress === false);
    return res.status(200).json(matchesFinish);
  }

  public async finish(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this.service.getById(Number(id));
    const finish = { ...match?.dataValues, inProgress: false } as IMatches;
    const uptaded = await this.service.upDate(finish);
    if (!uptaded) {
      return res.status(404).json({ message: 'Match not found' });
    }
    return res.status(200).json({ message: 'Finished' });
  }

  public async upDate(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.service.getById(Number(id));
    const goals = { ...match?.dataValues, homeTeamGoals, awayTeamGoals } as IMatches;
    if (goals) {
      const uptaded = await this.service.upDate(goals);
      if (!uptaded) {
        return res.status(404).json({ message: 'Match not found' });
      }
    } return res.status(200).json(goals);
  }

  public async postMatch(req: Request, res: Response) {
    const matchReq = req.body;
    const { homeTeamId, awayTeamId } = req.body;
    const teamsEqual = validateMatch(homeTeamId, awayTeamId);
    if (teamsEqual) {
      return res.status(422).json(teamsEqual);
    }
    const teamsExist = await validateTeam(homeTeamId, awayTeamId);
    if (!teamsExist) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const matchValid = await this.service.create(matchReq);
    return res.status(201).json(matchValid);
  }
}
