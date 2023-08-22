import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'

import TeamsModelSequelize from '../database/models/Teams';
import UserModelSequelize from '../database/models/Users';
import MatchesModelSequelize from '../database/models/Matches';

import * as usersMock from '../tests/mocks/UsersMock'
import * as teamsMock from '../tests/mocks/TeamsMock'
import * as matchesMock from '../tests/mocks/MatchesMock'

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
const { app, start } = new App();

describe('App', function () {
  describe('Start', function () {
    it('Verify if its possible to initiate', function () {
      expect(start).to.be.ok;
    })
  })
  describe('Express', function () {
    const loginRoute = '/login';
    const teamsRoute = '/teams';
    const matchesRoute = '/matches';

    beforeEach(function () {
      sinon.restore();
    })

    it('Verify if the app exists', function () {
      expect(app).to.be.ok;
    })

    describe('Login tests', function () {
     afterEach(function() {
        sinon.restore();
      })

      it('Verify if its possible filter an user', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
        sinon.stub(UserModelSequelize, 'findOne').resolves(usersMock.user1 as any);
        const response = await chai.request(app).post(loginRoute).send(usersMock.loginBody)
        expect(response).to.have.status(200);
        expect(response.body).to.haveOwnProperty('token');
      })

      it('Should be returns an 401 error if the email its invalid', async function () {
        const response = await chai.request(app).post(loginRoute).send(usersMock.invalidLoginEmailBody)
        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'Invalid email or password'
        });
      })

      it('Should be returns an 401 error if the password its invalid', async function () {
        const response = await chai.request(app).post(loginRoute).send(usersMock.invalidLoginPasswordBody)
        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'Invalid email or password'
        });
      })

      it('Should be returns an 401 error if the Token doesnt exists', async function() {
        const { status, body } = await chai.request(app).get(`${loginRoute}/role`);
        expect(status).to.equal(401);
        expect(body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Teams tests', function () {
      beforeEach(function () {
        sinon.restore();
      })

      it('Verify if its possible to search all teams', async function () {
        sinon.stub(TeamsModelSequelize, 'findAll').resolves(teamsMock.teams as any);
        const response = await chai.request(app).get(teamsRoute);
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal(teamsMock.teams);
      });
  
      it('Verify if its possible to search a team by id', async function() {
        sinon.stub(TeamsModelSequelize, 'findByPk').resolves(teamsMock.team1 as any);
        const { status, body } = await chai.request(app).get(`${teamsRoute}/1`)
        expect(status).to.equal(200);
        expect(body).not.to.be.deep.equal(teamsMock.team2);
        expect(body).to.be.deep.equal(teamsMock.team1);
      });

      it('Should be returns an 404 error if the id its invalid', async function() {
        sinon.stub(TeamsModelSequelize, 'findByPk').resolves(undefined as any);
        const { status, body } = await chai.request(app).get(`${teamsRoute}/69`)
        expect(status).to.equal(404);
        expect(body).to.be.deep.equal({ message: 'Team 69 not found' });
      });
    })

    describe('Matches tests', function () {
      beforeEach(function () {
        sinon.restore();
      })

      it('Verify if its possible to create a match', async function() {
        sinon.stub(UserModelSequelize, 'findOne').resolves(usersMock.user1 as any);
        sinon.stub(MatchesModelSequelize, 'create').resolves({ ...matchesMock.createdMatch, inProgress: true } as any);
        const tokenResponse = await chai.request(app).post(loginRoute).send(usersMock.loginBody)
        const response = await chai
          .request(app)
          .post(matchesRoute)
          .set('Authorization', 'Bearer ' + tokenResponse.body.token)
          .send(matchesMock.createdMatch)
        expect(response).to.have.status(201);
        expect(response.body).to.be.deep.equal({ ...matchesMock.createdMatch, inProgress: true });
      });

      it('Verify if its possible to search all matches', async function () {
        sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock.allMatches as any);
        const response = await chai.request(app).get(matchesRoute);
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal(matchesMock.allMatches);
      });

      it('Verify if its possible to search a match in progress', async function () {
        sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock.inProgressMatches as any);
        const response = await chai.request(app).get(`${matchesRoute}?inProgress=true`);
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal(matchesMock.inProgressMatches);
      });
    })
  })

});
