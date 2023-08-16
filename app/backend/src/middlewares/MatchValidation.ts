import { Request, Response, NextFunction } from 'express';
import { ITeam } from '../Interfaces/Teams/ITeam';
import TeamModel from '../models/TeamsModel';
import mapStatus from '../utils/mapStatus';

export default class Validation {
  static async matchValidation(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res
        .status(mapStatus('CONFLICT'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamModel = new TeamModel();
    const teams: ITeam[] = await teamModel.findAll();

    if (!teams.some((team) => team.id === homeTeamId)
    || !teams.some((team) => team.id === awayTeamId)) {
      return res
        .status(mapStatus('NOT_FOUND'))
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
