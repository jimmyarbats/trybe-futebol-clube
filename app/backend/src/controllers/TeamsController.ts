import { Request, Response } from 'express';
import TeamService from '../service/TeamsService';
import mapStatus from '../utils/mapStatus';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAll();
    res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
