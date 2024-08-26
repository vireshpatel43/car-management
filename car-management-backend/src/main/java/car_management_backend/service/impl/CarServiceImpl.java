package car_management_backend.service.impl;

import car_management_backend.dto.CarDto;
import car_management_backend.entity.Car;
import car_management_backend.exception.ResourceNotFoundException;
import car_management_backend.mapper.CarMapper;
import car_management_backend.repository.CarRepository;
import car_management_backend.service.CarService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CarServiceImpl implements CarService {

    private CarRepository carRepository;

    @Override
    public CarDto createCar(CarDto carDto) {
        // Map the DTO to a JPA entity
        Car car = CarMapper.mapToCar(carDto);
        // Save the JPA entity for return
        Car savedCar = carRepository.save(car);
        return CarMapper.mapToCarDto(savedCar);
    }

    @Override
    public CarDto getCarById(long carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with ID \"" + carId + "\" not found."));
        return CarMapper.mapToCarDto(car);
    }

    @Override
    public List<CarDto> getAllCars() {
        List<Car> cars = carRepository.findAll();
        return cars.stream().map((car) -> CarMapper.mapToCarDto(car)).collect(Collectors.toList());
    }

    @Override
    public CarDto updateCar(long carId, CarDto updatedCarDto) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with ID \"" + carId + "\" not found."));
        // update Car object with new attributes
        car.setMake(updatedCarDto.getMake());
        car.setModel(updatedCarDto.getModel());
        car.setYear(updatedCarDto.getYear());
        car.setName(updatedCarDto.getName());
        // Save the updated object in the database
        Car updatedCar = carRepository.save(car);

        return CarMapper.mapToCarDto(updatedCar);
    }

    @Override
    public void deleteCar(long carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with ID \"" + carId + "\" not found."));
        carRepository.deleteById(carId);
    }


}
