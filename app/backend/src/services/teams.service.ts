import TeamModel from "../database/models/teams.model";

export default class TeamService {
  private model = TeamModel;
  
  async getAll() {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
  
  async getById(id: number) {
    const teamById = await this.model.findByPk(id);
  //   if (!team) {
  //     return null;
  //   }
    return teamById;
  }
}