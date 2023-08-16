import { ID } from '.';

export interface ICrudCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICrudReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICrudInProgress<T> {
  findInProgress(inProgress: boolean): Promise<T[]>,
}

export interface ICrudEmail<T> extends ICrudReader<T> {
  findByEmail(email: string): Promise<T | null>,
}

export interface ICrudUpdater<T> {
  finish(id: ID): Promise<T | null>,
  update(id: ID, homeTeamGoals: ID, awayTeamGoals: ID): Promise<T | null>,
}

export interface ICrudDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICrud<T>
  extends ICrudCreator<T>, ICrudReader<T>,
  ICrudInProgress<T>, ICrudUpdater<T> { }
