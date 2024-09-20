import {assert} from 'assert';
import mostPopularCar from "/Bootcamp/mostPopularCar.js";

describe('mostPopularCar tests', function () {
    let cars = [];
    before(async function () {
        await axios.get('https://bootcamp.projectcodex.co/cars.json')
            .then(response => {
                cars = response.data;
            })
            .catch(error => {
                console.error('Error fetching initial car data:', error);
            });
    });

    it('It should get most popular car correctly', function () {
        assert.strictEqual(mostPopularCar(cars), 'Toyota');
    });

    it('It should test for empty list', function () {
        assert.strictEqual(mostPopularCar([]), 'Error in fetching data');
    });

    it('It should return an error message for invalid input', function () {
        assert.strictEqual(mostPopularCar('invalid input'), 'Error in fetching data');
        assert.strictEqual(mostPopularCar(null), 'Error in fetching data');
        assert.strictEqual(mostPopularCar(undefined), 'Error in fetching data');
    });

});

