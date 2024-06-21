import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/teams.model';
import { app } from '../app';
import { teamMock1, AllTeams } from './mocks/teamsMock';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o fluxo Teams', () => {

  it('Testa o getAll', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(AllTeams as unknown as Model[]);
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(AllTeams);
  });

  it('Testa o getById', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teamMock1 as unknown as Model);
    const res = await chai.request(app).get('/teams/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(teamMock1);
  });

  afterEach(sinon.restore);
});
