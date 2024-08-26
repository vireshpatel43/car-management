import axios from "axios";

// URL from the REST API implemented with Spring
const REST_API_BASE_URL = 'http://localhost:8080/api/cars'

export type Car =  {
    make: string;
    model: string;
    year: number;
    name: string;
};

// Gets a list of cars from the API request
export const listCars = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createCar = (car: Car) => {
    return axios.post(REST_API_BASE_URL, car);
}

export const getCar = (carID: number) => {
    return axios.get(REST_API_BASE_URL + '/' + carID);
}

export const updateCar = (carID: number, car: Car) => {
    return axios.put(REST_API_BASE_URL + '/' + carID, car);
}

export const deleteCar = (carID: number) => {
    return axios.delete(REST_API_BASE_URL + '/' + carID);
}