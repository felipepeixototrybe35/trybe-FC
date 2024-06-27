import MatchModel from '../database/models/matches.model';
import TeamModel from '../database/models/teams.model';
import { IMatches } from '../Interfaces/IMatches';

export default class CalculationsLeaderBoardHome {
  constructor(
    private modelTeam = TeamModel,
    private modelMatches = MatchModel,
  ) {}

  static totalGames(teamMatches: IMatches[]) {
    return teamMatches.length;
  }

  static totalPoints(teamMatches: IMatches[]) {
    const victory = teamMatches
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length * 3;
    const draw = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;

    return victory + draw;
  }

  async teamsAndMatches() {
    const teams = await this.modelTeam.findAll();
    const teamData = teams.map((team) => team.dataValues);
    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const matchesData = matches.map((match) => match.dataValues);
    return { teamData, matchesData };
  }

  static victories(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  static draws(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  static losses(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  static goalsFavor(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  static goalsOwn(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  static goalsBalance(teamMatches: IMatches[]) {
    const balanceGoalsFavor = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const balanceGoalsOwn = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return balanceGoalsFavor - balanceGoalsOwn;
  }

  static efficiency(teamMatches: IMatches[]) {
    const totalPoints = CalculationsLeaderBoardHome.totalPoints(teamMatches);
    const totalGames = CalculationsLeaderBoardHome.totalGames(teamMatches);
    return (totalPoints / (totalGames * 3)) * 100;
  }

  async getHomeTeamsMatches() {
    const { teamData, matchesData } = await this.teamsAndMatches();
    const leaderBoard = teamData.map((team) => {
      const teamMatches = matchesData.filter((match) => match.homeTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: CalculationsLeaderBoardHome.totalPoints(teamMatches),
        totalGames: CalculationsLeaderBoardHome.totalGames(teamMatches),
        totalVictories: CalculationsLeaderBoardHome.victories(teamMatches),
        totalDraws: CalculationsLeaderBoardHome.draws(teamMatches),
        totalLosses: CalculationsLeaderBoardHome.losses(teamMatches),
        goalsFavor: CalculationsLeaderBoardHome.goalsFavor(teamMatches),
        goalsOwn: CalculationsLeaderBoardHome.goalsOwn(teamMatches),
        goalsBalance: CalculationsLeaderBoardHome.goalsBalance(teamMatches),
        efficiency: CalculationsLeaderBoardHome.efficiency(teamMatches).toFixed(2),
      };
    });
    return leaderBoard;
  }
}
