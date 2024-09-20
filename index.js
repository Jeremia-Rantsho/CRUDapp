import express, { response } from 'express';
import axios from 'axios'; 
import cors from 'cors';
import mostPopularCar from './Bootcamp/mostPopularCar.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.get('/all_cars', async (req, res) => {
    try{
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        res.json(response.data);
    }catch (error){
        res.status(500).send('Unfortunately error occurred while fetching data...');
    }
});

app.get('/popularCar', async (req, res) => {
    try{
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        const popularCar = mostPopularCar(response.data);
        res.json(popularCar);
    }catch (error){
        res.status(500).send('Unfortunately error occurred while fetching data...')
    }
});

app.post('/addCar', async (req, res) => {
    try{
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        const carsList = response.data;
        const newCar = req.body;
        carsList.push(newCar);
        res.status(201).json({message: 'Car added successfully!', carsList});

    }catch (error){
        res.status(400).send('Bad Request...')
    }
    
});

app.put('/updateCarinfo/:reg_number', async (req, res) => {
    try{
        const regNumber = req.params.reg_number;
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        const carsList = response.data;

        const carLocation = carsList.findIndex(car => car.reg_number === regNumber);
        if(carLocation === -1){
            res.status(404).json({message: 'Car with provided registration could not be found!'});
        }

        carsList[carLocation] = { ...carsList[carLocation], ...req.body};
        await axios.put('https://bootcamp.projectcodex.co/cars.json', carsList); //left out because it keeps giving server error
        res.status(200).json({message: 'Car info updated successfully.', car: carsList[carLocation]});

    }catch (error){
        res.status(500).json({message: 'Unfortunately we could not update your information...', error: error.message});
    }
});

app.delete('/deleteCar/:reg_number', async (req, res) => {
    try{
        const regNumber = req.params.reg_number;
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        const carsList = response.data;

        const carLocation = carsList.findIndex(car => car.reg_number === regNumber);
        if(carLocation === -1){
            res.status(404).json('Car not found!');
        }

        const carDeleted = carsList.splice(carLocation, 1);
        await axios.put('https://bootcamp.projectcodex.co/cars.json');
        res.status(201).json({message: 'Car deleted successfully.', car: carDeleted});

    }catch (error){
        res.status(500).json({message: 'Could not delete the car from the server.', error: error.message});
    }
});
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
});