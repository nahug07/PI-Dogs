/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'PerritoTest',
  id: 'bcaf121f-4dab-4129-90c5-50ae9512eb7f', 
  weight: '8',
  height: '25',
  life_span: '14',
  temperament: "Clever",
  image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Mops-falk-vom-maegdebrunnen-internationaler-champion-fci.jpg' 
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe("Obtiene un Dog por id", () => {
  describe("GET /dogs/:id", () => {
    it("Se espera una respuesta 200 si se pasa un id", () =>
      agent.get("/dogs/bcaf121f-4dab-4129-90c5-50ae9512eb7f").expect(200));
  });
})
  
describe("Obtiene un Dog por name", () => {
  describe("GET /dogs?name=", () => {
    it("Si se recibe name devuelve una respuesta 200", () =>
      agent.get("/dogs?name=PerritoTest").expect(200));
  });
})

describe("Obtener temperamentos", () => {
  describe('/temperament', function() {
    it('GET respond with a status 200 if you find temperaments', () =>
      agent.get('/temperament').expect(200)); 
    });
  })

