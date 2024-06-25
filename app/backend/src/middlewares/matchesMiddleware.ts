import TeamModel from '../database/models/teams.model';

export function validateMatch(homeTeamId: string, awayTeamId: string) {
  if (homeTeamId === awayTeamId) {
    return { message: 'It is not possible to create a match with two equal teams' };
  }
  return false;
}

export async function validateTeam(homeTeamId: number, awayTeamId: number) {
  const teams = await Promise.all([
    TeamModel.findByPk(homeTeamId),
    TeamModel.findByPk(awayTeamId),
  ]);
  if (teams.some((team) => !team)) {
    return null;
  }
  return true;
}
