import MatchModel from '../database/models/matches.model';
import TeamModel from '../database/models/teams.model';
import { IMatches } from '../Interfaces/IMatches';

export default class CalculationsLeaderBoardAway {
  constructor(
    private modelTeam = TeamModel,
    private modelMatches = MatchModel,
  ) {}

  static totalGames(teamMatches: IMatches[]) {
    return teamMatches.length;
  }

  static totalPoints(teamMatches: IMatches[]) {
    const victory = teamMatches
      .filter((match) => match.awayTeamGoals > match.homeTeamGoals).length * 3;
    const draw = teamMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;

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
    return teamMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
  }

  static draws(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
  }

  static losses(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
  }

  static goalsFavor(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  static goalsOwn(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  static goalsBalance(teamMatches: IMatches[]) {
    const balanceGoalsFavor = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const balanceGoalsOwn = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return balanceGoalsFavor - balanceGoalsOwn;
  }

  static efficiency(teamMatches: IMatches[]) {
    const totalPoints = CalculationsLeaderBoardAway.totalPoints(teamMatches);
    const totalGames = CalculationsLeaderBoardAway.totalGames(teamMatches);
    return (totalPoints / (totalGames * 3)) * 100;
  }

  async getAwayTeamsMatches() {
    const { teamData, matchesData } = await this.teamsAndMatches();
    const leaderBoard = teamData.map((team) => {
      const teamMatches = matchesData.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: CalculationsLeaderBoardAway.totalPoints(teamMatches),
        totalGames: CalculationsLeaderBoardAway.totalGames(teamMatches),
        totalVictories: CalculationsLeaderBoardAway.victories(teamMatches),
        totalDraws: CalculationsLeaderBoardAway.draws(teamMatches),
        totalLosses: CalculationsLeaderBoardAway.losses(teamMatches),
        goalsFavor: CalculationsLeaderBoardAway.goalsFavor(teamMatches),
        goalsOwn: CalculationsLeaderBoardAway.goalsOwn(teamMatches),
        goalsBalance: CalculationsLeaderBoardAway.goalsBalance(teamMatches),
        efficiency: CalculationsLeaderBoardAway.efficiency(teamMatches).toFixed(2),
      };
    });
    return leaderBoard;
  }
}
