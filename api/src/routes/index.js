const { Router } = require('express');
const {Country, Activity} =  require('../db.js');
const { createActivity, getCountries, getCountryById, getActivities } = require('./controllers.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router
    .route('/activity')
    .post(createActivity)
    .get(getActivities)
router
    .route('/countries')
    .get(getCountries)
router
    .route('/countries/:id')
    .get(getCountryById)
module.exports = router;
