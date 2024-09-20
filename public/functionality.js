document.addEventListener('alpine:init', () => {
    Alpine.data('mostPopularCarFunction', () => {
        return {
            popularCar: '',
            carList: [],
            newCar: {
                reg_number: '',
                color: '',
                make: '',
                model: '',
                
            },
            updateCarData: {
                reg_number: '',
                color: '',
                make: '',
                model: '',
                
            },
            deleteCarReg: null,
            responseMessage: '',
            updateMessage: '',
            deleteMessage: '',

            async getPopularCar(){
                try{
                    const response = await axios.get('http://localhost:3050/popularCar');
                    this.popularCar = response.data;
                }
                catch(error){
                    console.error('We could not get the popular car.')
                }
            },
            async getCarList(){
                try{
                    const response = await axios.get('http://localhost:3050/all_cars');
                    this.carList = response.data;
                }
                catch(error){
                    console.error('We could not get the list of cars.')
                }
            },
            async addCar() {
                await axios.post('http://localhost:3050/addCar', this.newCar)
                    .then(response => {
                        this.responseMessage = response.data.message;
                        this.clearNewCarForm();
                    })
                    .catch(error => {
                        this.responseMessage = error.response.data.error;
                    });
            },
            async updateCar() {
                await axios.put(`http://localhost:3050/updateCarinfo/${this.updateCarData.reg_number}`, this.updateCarData)
                    .then(response => {
                        this.updateMessage = response.data.message;
                        this.clearUpdateCarForm();
                    })
                    .catch(error => {
                        this.updateMessage = error.response.data.error;
                    });
            },
            async deleteCar() {
                await axios.delete(`http://localhost:3050/deleteCar/${this.deleteCarReg}`)
                    .then(response => {
                        this.deleteMessage = response.data.message;
                        this.deleteCarId = null;
                    })
                    .catch(error => {
                        this.deleteMessage = error.response.data.error;
                    });
            },
            clearNewCarForm() {
                this.newCar.color = '';
                this.newCar.make = '';
                this.newCar.model = '';
                this.updateCarData.reg_number = '';

            },
            clearUpdateCarForm() {
                this.updateCarData.reg_number = '';
                this.updateCarData.make = '';
                this.updateCarData.model = '';
                this.updateCarData.color = '';
            }
        }
    })
});
