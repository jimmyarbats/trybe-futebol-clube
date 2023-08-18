import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceRes';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async leaderboard(param: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeamsInfo = await this.leaderboardModel.getLeaderboard(param);

    allTeamsInfo.sort((team1, team2) => {
      if (team2.totalPoints !== team1.totalPoints) {
        return team2.totalPoints - team1.totalPoints;
      }
      if (team2.totalVictories !== team1.totalVictories) {
        return team2.totalVictories - team1.totalVictories;
      }
      if (team2.goalsBalance !== team1.goalsBalance) {
        return team2.goalsBalance - team1.goalsBalance;
      }
      return team2.goalsFavor - team1.goalsFavor;
    });

    return { status: 'SUCCESSFUL', data: allTeamsInfo };
  }
}
