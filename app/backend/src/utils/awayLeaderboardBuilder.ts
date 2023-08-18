import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { IMatch } from '../Interfaces/Matches/IMatch';

export default class AwayLeaderboardUtils {
  static calculatePoints(id: number, matches: IMatch[]): number {
    let totalPoints = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) totalPoints += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      return totalPoints;
    });
    return totalPoints;
  }

  static calculateGames(id: number, matches: IMatch[]): number {
    let totalGames = 0;
    matches.map((match) => {
      if (match.awayTeamId === id) totalGames += 1;
      return totalGames;
    });
    return totalGames;
  }

  static calculateVictories(id: number, matches: IMatch[]): number {
    let totalVictories = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) totalVictories += 1;
      return totalVictories;
    });
    return totalVictories;
  }

  static calculateDraws(id: number, matches: IMatch[]): number {
    let totalDraws = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) totalDraws += 1;
      return totalDraws;
    });
    return totalDraws;
  }

  static calculateLosses(id: number, matches: IMatch[]): number {
    let totalLosses = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
      return totalLosses;
    });
    return totalLosses;
  }

  static calculateTeamGoals(id: number, matches: IMatch[]): number {
    let goalsFavor = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      goalsFavor += match.awayTeamGoals;
      return goalsFavor;
    });
    return goalsFavor;
  }

  static calculateGoalsOwn(id: number, matches: IMatch[]): number {
    let goalsOwn = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      goalsOwn += match.homeTeamGoals;
      return goalsOwn;
    });
    return goalsOwn;
  }

  static goalsBalance(id: number, matches: IMatch[]): number {
    const goalsBalance = this.calculateTeamGoals(id, matches) - this.calculateGoalsOwn(id, matches);
    return goalsBalance;
  }

  static calculateEfficiency(id: number, matches: IMatch[]): number {
    const efficiency = (this.calculatePoints(id, matches)
    / (this.calculateGames(id, matches) * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  static infostatistics(id: number, matches: IMatch[]): ILeaderboard {
    return {
      totalPoints: this.calculatePoints(id, matches),
      totalGames: this.calculateGames(id, matches),
      totalVictories: this.calculateVictories(id, matches),
      totalDraws: this.calculateDraws(id, matches),
      totalLosses: this.calculateLosses(id, matches),
      goalsFavor: this.calculateTeamGoals(id, matches),
      goalsOwn: this.calculateGoalsOwn(id, matches),
      goalsBalance: this.goalsBalance(id, matches),
      efficiency: this.calculateEfficiency(id, matches),
    };
  }
}
