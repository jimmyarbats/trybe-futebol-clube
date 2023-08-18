import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboard('general');
    return res.status(200).json(serviceResponse.data);
  }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboard('home');
    return res.status(200).json(serviceResponse.data);
  }

  public async getAwayLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboard('away');
    return res.status(200).json(serviceResponse.data);
  }
}
