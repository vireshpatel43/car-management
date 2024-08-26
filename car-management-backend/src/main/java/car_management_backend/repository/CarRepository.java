package car_management_backend.repository;

import car_management_backend.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository provides methods for CRUD operations
public interface CarRepository extends JpaRepository<Car, Long> {
}
