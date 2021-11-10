const {Country, Activity} =  require('../db.js');
const axios = require('axios')
const {Op} = require('sequelize')

async function createActivity(req, res){
    try{
        const {id, name, difficulty, duration, season } = req.body
        const newActivity = await Activity.create({
            id,
            name,
            difficulty,
            duration,
            season
        })
        if (newActivity){
            res.json({
                message: 'Activity created',
                data: newActivity
            })
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Server error'})
    }
}


async function getCountries(req, res){
    const {name} = req.query
    if (name === undefined) {
        try {
            const paises = await Country.findAll({
                order:[
                    ['name', 'ASC']
                ],
                attributes:[
                    'name', 'id', 'image', 'continent', 'subregion', 'area', 'population'
                ]
            })
            res.json(paises)
        } catch(e){
            console.log(e)
        }
    } else{
        try {
            const country = await Country.findOne({
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            res.json(country)
        }catch(e){
            console.log(e)
        }
    }
}


// async function getCountryByQuery(req, res){
//     const {name} = req.query
//     if (name) {
//         try {
//             const country = await Country.findOne({
//                 where:{
//                     name: {
//                         [Op.iLike]: `%${name}%`
//                     }
//                 }
//             })
//             res.json(country)
//         }catch(e){
//             console.log(e)
//         }
//     }
//     else{
//         res.json({message: 'Country not found'})
//     }
// }

async function getCountryById(req, res){
    let {id} = req.params
    const country = await Country.findByPk(id, {include: Activity})
    res.json(country)
}


module.exports = {
    createActivity,
    getCountries,
    getCountryById,
    // getCountryByQuery
}