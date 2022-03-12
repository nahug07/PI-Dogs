const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'PerritoTest' });
      });
    });
  });
});


//-------------------------------//
describe("weight", () => {
  it("should throw an error if weight is null", (done) => {
    Dog.create({})
      .then(() => done(new Error("notNull Violation: dog.weight cannot be null")))
      .catch(() => done());
  });
  it('should work when its a valid weight value', () => {
    Dog.create({ weight: '8' });
  });
 });

describe("height", () => {
  it("should throw an error if height is null", (done) => {
    Dog.create({})
      .then(() => done(new Error("notNull Violation: dog.height cannot be null")))
      .catch(() => done());
  });
  it('should work when its a valid height value', () => {
    Dog.create({ height: '25' });
  });
 });


