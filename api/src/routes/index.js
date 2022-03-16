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
            name: e.name,  //guardo solo lo que necesito de la api
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
    return await Dog.findAll({  //traeme todos los perros y ademas
        include: {              // incluime el modelo temperament
            model: Temperament, //y de ese modelo, traeme el nombre
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
    const name = req.query.name; //me fijo si hay un query con esa propiedad
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
        temperaments = temperaments.join().split(","); //.join une todos .split los separa con ,
        temperaments = temperaments.filter (ob => ob) //esto evita que me quede uno en blanco
        temperaments = [...new Set (temperaments)].sort(); //con el constructor Set solo dejo los valores sin repetir y los ordeno                         
        temperaments.forEach((ob) => {   //una vez por cada elemento
          Temperament.findOrCreate({    //busca la entrada y si no esta, la crea
            where: { name: ob },        
          });
        });
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments); 
    })


router.post("/dog", async (req, res) => {
    const { 
        name,
        height, 
        weight, 
        life_span, //pido esto por body
        image,
        createdInDb, 
        temperament
    } = req.body;    
    const newDog = await Dog.create({   
        name, 
        height, 
        weight, //creo el nuevo perro
        life_span, 
        image, 
        createdInDb
    })
    let temperamentDb = await Temperament.findAll({ //tengo que hacer la relacion aparte
            where: { name : temperament}   //los temp los tengo que buscar en el modelo
        })
    await newDog.addTemperament(temperamentDb) 
    res.status(201).send({ info: "Dog created successfully!" })
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
