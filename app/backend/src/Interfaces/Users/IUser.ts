import { Identifiable } from '../index';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends Identifiable, ILogin {
  username: string,
  role: string,
}
