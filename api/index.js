//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios')
// Syncing all the models at once.
conn.sync({ force: true }).then( async() => {
  server.listen(3001, () => {
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
              name: countries.data[i].name.official,
              id: countries.data[i].cca3,
              image:countries.data[i].flags[0],
              continent:countries.data[i].region,
              // capital: countries.data[i].capital ? countries.data[i].capital[0] : 'Capital not found',
              subregion: countries.data[i].subregion,
              area: countries.data[i].area,
              population:countries.data[i].population 
          })
      }
      await Country.bulkCreate(array)
  }
}
copyCountries()