const {Country, Activity} =  require('../db.js');
const axios = require('axios')
const {Op} = require('sequelize')

async function createActivity(req, res){
    console.log(req.body)
    const {name, difficulty, duration, season, country } = req.body
    
    try{
        console.log(country)
        //id??
        const newActivity = await Activity.create({  
            name,
            difficulty,
            duration,
            season
        })

        const countryDb = await Country.findAll({
            where:{
                name: {
                    [Op.in]: country
                }
            }
        })
        console.log(countryDb)
        for (let i = 0; i < countryDb.length; i++){
            countryDb[i].addActivity(newActivity)
        }

        res.send(`Activity created in countries ${country.map((c)=>c)}`)

    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Server error'})
    }
}


async function getCountries(req, res){
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


async function getActivities(req, res){
    const activities = await Activity.findAll()
    return res.json(activities)
}

module.exports = {
    createActivity,
    getCountries,
    getCountryById,
    getActivities
}