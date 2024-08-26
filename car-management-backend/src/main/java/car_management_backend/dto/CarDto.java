package car_management_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/**
 * Class to transmit data between client and server
 */
public class CarDto {
    private long id;
    private String make;
    private String model;
    private int year;
    private String name;
}
