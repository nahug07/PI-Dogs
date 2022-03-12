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
            weight: e.weight.metric,   
            height: e.height.metric,
            life_span: e.life_span,  
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
        res.status(404).send('Dog not found')
    } else {
        res.status(200).send(dogsTotal)
    }
})


router.get('/temperament', async (req, res) =>{
    const temperamentsApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    let temperaments = temperamentsApi.map((ob) => ob.temperament);
        temperaments = temperaments.join().split(",");
        temperaments = temperaments.filter (ob => ob)
        temperaments = [...new Set (temperaments)].sort();                          
        temperaments.forEach((ob) => {   
          Temperament.findOrCreate({    
            where: { name: ob },        
          });
        });
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments); 
    })


    router.post("/dog", async (req, res, next) => {
        try {
            const { name, height, weight, life_span, image, createdInDb, temperament} = req.body;    
            const newDog = await Dog.create({   
                name, 
                height, 
                weight, 
                life_span, 
                image, 
                createdInDb
            })
            let temperamentDb = await Temperament.findAll({ 
                where: { name : temperament}   
            })
            await newDog.addTemperament(temperamentDb) 
            res.status(201).send({ info: "Dog created successfully!" })
        } catch (error) {
            next(error)
        };
    });


    router.get('/dogs/:id', async (req, res) =>{
        const id = req.params.id;
        const dogsTotal = await getAllDogs()
        if(id){
            let dogId = await dogsTotal.filter( e => e.id == id)
            dogId.length?
            res.status(200).json(dogId) :
            res.status(404).send('Dog not found')
        }
    })

 

module.exports = router;
