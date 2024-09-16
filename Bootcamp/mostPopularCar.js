export default function mostPopularCar(carList) {
    if (!Array.isArray(carList) || carList.length === 0) {
      return 'Error in fetching data';
    }
  
    const carCounts = {};
    let maxCount = 0;
    let popularCar = '';
  
    for (const car of carList) {
      const make = car.make;
      carCounts[make] = (carCounts[make] || 0) + 1;
      if (carCounts[make] > maxCount) {
        maxCount = carCounts[make];
        popularCar = make;
      }
    }
  
    return popularCar;
  }