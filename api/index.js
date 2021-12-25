
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios')
// Syncing all the models at once.
conn.sync({ force: false }).then( async() => {
  server.listen(3001, () => {
    copyCountries()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

async function copyCountries(){
  let countries = await Country.findAll()
  if(countries.length === 0){
      const countries = await axios.get('https://restcountries.com/v3/all')
      let array = []
      for (let i = 0; i < countries.data.length; i++){
          array.push({
              name: countries.data[i].name.common,
              id: countries.data[i].cca3,
              image:countries.data[i].flags[0],
              continent:countries.data[i].region,
              capital: countries.data[i].capital ? countries.data[i].capital[0] : 'Capital not found',
              subregion: countries.data[i].subregion ? countries.data[i].subregion : 'Not found',
              area: countries.data[i].area,
              population:countries.data[i].population
          })
      }
      await Country.bulkCreate(array)
  }
}

