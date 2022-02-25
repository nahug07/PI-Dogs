const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Dog, Temperament } = require('../db')
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const ApiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const ApiInfo = await ApiUrl.data.map(e => {
        return {
            name: e.name,
            id: e.id,
            image: e.image.url,
            temperament: e.temperament,
            weight: e.weight.metric,    /* peso */
            height: e.height.metric,
            life_span: e.life_span,   /* años de vida */
        }
    });
    return ApiInfo
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
};

const getAllDogs = async () => {
    const ApiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = ApiInfo.concat(dbInfo);
    return infoTotal;
}

// --> Routes <-- //

router.get('/dogs', async (req, res) =>{
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter( e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('No se encontró la raza')
    } else {
        res.status(200).send(dogsTotal)
    }
})




module.exports = router;
