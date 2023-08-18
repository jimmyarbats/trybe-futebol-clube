import SequelizeMatch from '../database/models/Matches';
import SequelizeTeam from '../database/models/Teams';
import LeaderboardBuilder from '../utils/leaderboardBuilder';
import HomeLeaderboardBuilder from '../utils/homeLeaderboardBuilder';
import AwayLeaderboardBuilder from '../utils/awayLeaderboardBuilder';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ITeam } from '../Interfaces/Teams/ITeam';
import { IMatch } from '../Interfaces/Matches/IMatch';

export default class LeaderboardModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async getAllTeams(): Promise<ITeam[]> {
    const dbData = await this.teamModel.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async getAllFinished(): Promise<IMatch[]> {
    const dbData = await this.matchModel.findAll({
      where: { inProgress: false },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData.map(
      ({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
        { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
      ),
    );
  }

  async getLeaderboard(param: string): Promise<ILeaderboard[]> {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getAllFinished();

    switch (param) {
      case 'home': return allTeams.map((team) => ({
        name: team.teamName,
        ...HomeLeaderboardBuilder.infostatistics(team.id, allMatches),
      }));
      case 'away': return allTeams.map((team) => ({
        name: team.teamName,
        ...AwayLeaderboardBuilder.infostatistics(team.id, allMatches),
      }));
      default: return allTeams.map((team) => ({
        name: team.teamName,
        ...LeaderboardBuilder.infostatistics(team.id, allMatches),
      }));
    }
  }
}
