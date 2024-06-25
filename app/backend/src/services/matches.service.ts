import MatchModel from '../database/models/matches.model';
import TeamModel from '../database/models/teams.model';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchService {
  private model = MatchModel;

  async getAll() {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getById(id: number) {
    const matchId = await this.model.findByPk(id);
    return matchId;
  }

  async upDate(match: IMatches) {
    const matchUp = await this.model.update(match, { where: { id: match.id } });
    return matchUp;
  }

  async create(match: IMatches) {
    const newMatche = await this.model.create(match);
    if (!newMatche) return null;
    return newMatche;
  }
}
