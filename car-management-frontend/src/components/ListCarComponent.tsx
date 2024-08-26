import styles from '../styles/Components.module.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { listCars, deleteCar } from '../services/CarService';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'

type Car = {
    id: number;
    make: string;
    model: string;
    year: number;
    name: string;
};


const ListCarComponent = () => {

    const [cars, setCars] = useState<Car[]>([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllCars();
    }, [])

    function getAllCars() {
        listCars().then((response) => {
            setCars(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewCar() {
        navigator('/add-car')
    }

    function updateCar(id: number) {
        navigator(`/edit-car/${id}`)
    }

    function removeCar(id: number) {
        console.log(id);
        deleteCar(id).then(() => {
            // We want to refresh the list of cars after removing 
            getAllCars();
        }).catch(error => {
            console.error(error);
        })
        getAllCars();
    }


    return (
        <div>
            <h2 className="text-center" style={{ marginTop: '40px' }}>List of Cars</h2>
            <button className='btn btn-primary ms-5 mb-2 rounded-pill bg-success' onClick={addNewCar}>Add Car</button>
            <div className={styles.CardGroup}>
                <Row xs={1} md={3} className="g-4">
                    {cars.map(car => (
                        <Col key={car.id} className={styles.CardColumn}>
                            <Card className={styles.Card}>
                                <Dropdown className={styles.dropdownToggle}>
                                    <Dropdown.Toggle variant="button" className={styles.dropdownToggle}>
                                        <i className="bi bi-three-dots"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => removeCar(car.id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Card.Img variant="top" src="./public/vite.svg" width={100} height={100} />
                                <Card.Body>
                                    <Card.Title>{car.year} {car.make} {car.model}</Card.Title>
                                    <Card.Text>{car.name}</Card.Text>
                                    <Card.Footer className="d-flex justify-content-end">
                                        <Button className='btn btn-secondary'
                                            onClick={() => updateCar(car.id)}
                                        >
                                            <i className="bi bi-pen"></i>
                                        </Button>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default ListCarComponent