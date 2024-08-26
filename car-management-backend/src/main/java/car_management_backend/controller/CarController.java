package car_management_backend.controller;

import car_management_backend.dto.CarDto;
import car_management_backend.service.CarService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Allows all clients to call the API
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/cars")
public class CarController {
    private CarService carService;

    /**
     * Create car REST API
     * @param carDto The DTO to be added
     * @return http response
     */
    @PostMapping
    public ResponseEntity<CarDto> createCar(@RequestBody CarDto carDto) {
        CarDto savedCar = carService.createCar(carDto);
        return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
    }

    /**
     * Get car REST API
     * @param carId The carId of the get request
     * @return http response
     */
    @GetMapping("{id}")
    public ResponseEntity<CarDto> getCar(@PathVariable("id") long carId) {
        CarDto carDto = carService.getCarById(carId);
        return ResponseEntity.ok(carDto);
    }

    /**
     * Get all cars REST API
     * @return a list of all car DTO
     */
    @GetMapping
    public ResponseEntity<List<CarDto>> getAllCars() {
        List<CarDto> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }

    /**
     * Update a car REST API (PUT request)
     * @param carId id of the car being updated
     * @param updatedCar the updated car DTO
     * @return the updated car DTO
     */
    @PutMapping("{id}")
    public ResponseEntity<CarDto> updateCar(@PathVariable("id") long carId, @RequestBody CarDto updatedCar) {
        CarDto carDto = carService.updateCar(carId, updatedCar);
        return ResponseEntity.ok(carDto);
    }

    /**
     * Delete a car REST API
     * @param carId id of the car being deleted
     * @return success message
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCar(@PathVariable("id") long carId) {
        carService.deleteCar(carId);
        return ResponseEntity.ok("Car has been deleted.");
    }
}
