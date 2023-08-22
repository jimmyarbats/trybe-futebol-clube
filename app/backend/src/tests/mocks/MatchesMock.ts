const match1 = {
  id: 1,
  homeTeamId: 13,
  homeTeamGoals: 1,
  awayTeamId: 11,
  awayTeamGoals: 0,
  inProgress: true
}

const match2 = {
  id: 2,
  homeTeamId: 14,
  homeTeamGoals: 3,
  awayTeamId: 12,
  awayTeamGoals: 2,
  inProgress: true
}

const createdMatch = {
  id: 10,
  homeTeamId: 10,
  homeTeamGoals: 0,
  awayTeamId: 11,
  awayTeamGoals: 0,
}

const finished1 = {
  id: 1,
  homeTeamId: 5,
  homeTeamGoals: 0,
  awayTeamId: 6,
  awayTeamGoals: 2,
  inProgress: false
}

const finished2 = {
  id: 2,
  homeTeamId: 3,
  homeTeamGoals: 3,
  awayTeamId: 1,
  awayTeamGoals: 2,
  inProgress: false
}

const updatedMatch = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 7,
  inProgress: true
}

const request = {
  homeTeamGoals: 4,
  awayTeamGoals: 2,
}

const response = {
  id: 1,
  homeTeamGoals: 10,
  awayTeamGoals: 0,
  homeTeam: { teamName: 'Packman' },
  awayTeam: { teamName: 'Karoline' },
  inProgress: true
}

const allMatches = [match1, match2, finished1, finished2];
const inProgressMatches = [match1, match2];
const finishedMatches = [finished1, finished2];

export {
  match1,
  match2,
  createdMatch,
  finished1,
  finished2,
  updatedMatch,
  request,
  response,
  allMatches,
  inProgressMatches,
  finishedMatches,
};
