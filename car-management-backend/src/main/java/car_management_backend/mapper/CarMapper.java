package car_management_backend.mapper;

import car_management_backend.dto.CarDto;
import car_management_backend.entity.Car;

public class CarMapper {

    /**
     * Maps a Car object to a Dto (Data Transfer Object)
     * @param car The car object being converted
     * @return The Dto object representing the Car object
     */
    public static CarDto mapToCarDto(Car car) {
        return new CarDto(car.getId(), car.getMake(), car.getModel(), car.getYear(), car.getName());
    }

    /**
     * Maps a Dto to a Car object
     * @param carDto The Dto being converted
     * @return The Car object representing the Dto
     */
    public static Car mapToCar(CarDto carDto) {
        return new Car(carDto.getId(), carDto.getMake(), carDto.getModel(), carDto.getYear(), carDto.getName());
    }
}
