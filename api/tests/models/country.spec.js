const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');
const db = require('../../src/db.js');

// describe('Country model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Country.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Country.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Country.create({ name: 'Argentina' });
//       });
//     });
    
//   });
// });

describe('Country testing', () => {
  after(async function(){
    await conn.sync({force: true});
    // conn.close();
  })
  describe('Country model', function(){
    beforeEach(async function() {
      await Country.sync({force:true})
    })
    describe('Validaciones', function(){
      it ('Error sin nombre', function(done){
        Country.create({
          id:'ARG'
        })
        .then(() => done('No deberia haberse creado'))
        .catch(() => done())
      })
      it('error sin id', function(done){
        Country.create({
          name:'Argentina'
        })
        .then(() => done('no deberia haberse creado'))
        .catch(() => done())
      })
    })
  })
})