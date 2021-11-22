/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
// const { DESCRIBE } = require('sequelize/types/lib/query-types');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);


const country = {
  name: 'Argentina',
  id: "ARG",
  image: "https://flagcdn.com/ar.svg",
  continent:"Americas" ,
  capital: "Buenos Aires",
  subregion:null ,
  area:null ,
  population:null, 
  // activities:[]
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  after(() => conn.close())
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );

    it('responds with an object with the country', () =>
    agent.get('/countries').then((res) => {
      expect(res.body[0].name).to.be.equal('Argentina');
    }));
  });
});

