import CalculationsLeaderBoardHome from '../utils/leaderBoardHome';
import CalculationsLeaderBoardAway from '../utils/leaderBoardAway';
import orderByPoints from '../utils/orderLeaderBoard';

export default class LeaderBoardService {
  private model: CalculationsLeaderBoardHome = new CalculationsLeaderBoardHome();
  private modelAway: CalculationsLeaderBoardAway = new CalculationsLeaderBoardAway();

  async leaderBoardHome() {
    const matches = await this.model.getHomeTeamsMatches();
    const orderBoard = orderByPoints(matches);
    return orderBoard;
  }

  async leaderBoardAway() {
    const matches = await this.modelAway.getAwayTeamsMatches();
    const orderBoard = orderByPoints(matches);
    return orderBoard;
  }
}
