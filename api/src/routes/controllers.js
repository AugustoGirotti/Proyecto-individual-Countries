const {Country, Activity} =  require('../db.js');
const axios = require('axios')
const {Op} = require('sequelize')

async function createActivity(req, res){
    try{
        const {id, name, difficulty, duration, season, country } = req.body

        const newActivity = await Activity.create({  //findOrCreate
            // id,
            name,
            difficulty,
            duration,
            season
        })

        const countryDb = await Country.findOne({
            where:{
                name: {
                    [Op.iLike]: `%${country}%`
                }
            }
        })

        countryDb.addActivity(newActivity)

        res.send(`Activity created in ${countryDb.name}`)

    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Server error'})
    }
}

// async function copyCountries(){
//     let countries = await Country.findAll()
//     if(countries.length === 0){
//         const countries = await axios.get('https://restcountries.com/v3/all')
//         let array = []
//         for (let i = 0; i < countries.data.length; i++){
//             array.push({
//                 name: countries.data[i].name.common,
//                 id: countries.data[i].cca3,
//                 image:countries.data[i].flags[0],
//                 continent:countries.data[i].region,
//                 // capital: countries.data[i].capital ? countries.data[i].capital[0] : 'Capital not found',
//                 subregion: countries.data[i].subregion,
//                 area: countries.data[i].area,
//                 population:countries.data[i].population 
//             })
//         }
//         await Country.bulkCreate(array)
//     }
//   }

async function getCountries(req, res){
    // await copyCountries()
    if (Object.keys(req.query).length > 0 && !req.query.name){
        return res.json({message: 'Error'})
    }
    var {name} = req.query
    if (name === undefined) {
        try {
            const paises = await Country.findAll({
                order:[
                    ['name', 'ASC']
                ],
                attributes:[
                    'name', 'id', 'image', 'continent', 'subregion', 'area', 'population', 'capital'
                ],
                include: Activity
            })
            return res.json(paises)
        } catch(e){
            console.log(e)
        }
    } else{
        try {
            const country = await Country.findAll({
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: Activity
            })
            if (country === null){
                return res.json({message: 'Country not found'})
            }
            return res.json(country)
        }catch(e){
            console.log(e)
        }
    }
}




async function getCountryById(req, res){
    let {id} = req.params
    const country = await Country.findByPk(id, {include: Activity})
    res.json(country)
}


module.exports = {
    createActivity,
    getCountries,
    getCountryById,
}