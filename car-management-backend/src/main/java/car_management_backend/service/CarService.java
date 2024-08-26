package car_management_backend.service;

import car_management_backend.dto.CarDto;

import java.util.List;

public interface CarService {
    CarDto createCar(CarDto carDto);

    CarDto getCarById(long carId);

    List<CarDto> getAllCars();

    CarDto updateCar(long carId, CarDto updatedCarDto);

    void deleteCar(long carId);
}
