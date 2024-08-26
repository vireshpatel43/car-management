import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import CarSelector from "./CarSelector";
import { getCar, createCar, Car, updateCar } from "../services/CarService";
import { useNavigate, useParams } from "react-router-dom";

type Option = {
  label: string;
  value: string;
}


const CarComponent = () => {
  const [selectedMake, setSelectedMake] = useState<Option | null>(null);
  const [selectedModel, setSelectedModel] = useState<Option | null>(null);
  const [selectedYear, setSelectedYear] = useState<Option | null>(null);
  const [carName, setCarName] = useState('');

  // A variable that stores whether id is a paramter or not
  const {id} = useParams();

  const makeValue = selectedMake ? selectedMake.value : '';
  const modelValue = selectedModel ? selectedModel.value : '';
  const yearValue = selectedYear ? parseInt(selectedYear.value) : 0;

  const [errors, setErrors] = useState({
    make: '', 
    model: '',
    name: '',
    year: ''
  })

  const navigator = useNavigate();



  const handleCarName = (event : ChangeEvent<HTMLInputElement>) => {
    setCarName(event.target.value);
  }

  const handleMakeChange = (make: Option | null) => {
    setSelectedMake(make);
    setSelectedModel(null);
    setSelectedYear(null);
  }

  const handleModelChange = (model: Option | null) => {
    setSelectedModel(model);
    setSelectedYear(null);
  }

  const handleYearChange = (year: Option | null) => {
    setSelectedYear(year);
  }

  function saveOrUpdateCar(event : FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validateAddCar()) {
      const car: Car = {
        make: makeValue,
        model: modelValue,
        year: yearValue,
        name: carName
      };
      
      console.log(car)

      // If the ID is provided then it's an update request
      if (id) {
        updateCar(parseInt(id), car).then((response) => {
          console.log(response.data);
          navigator('/cars');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createCar(car).then((response) => {
          console.log(response.data);
          navigator('/cars');
        }).catch(error => {
          console.error(error);
        })
      }
    } 
  }

  // Validates the form to add a car
  function validateAddCar() {
    let valid: boolean = true;

    const errorsCopy = {... errors};

    if(makeValue.trim()) {
      errorsCopy.make = '';
    } else {
      errorsCopy.make = 'Please select a make';
      valid = false;
    }

    if(modelValue.trim()) {
      errorsCopy.model = '';
    } else {
      errorsCopy.model = 'Please select a model';
      valid = false;
    }

    if(yearValue) {
      errorsCopy.year = '';
    } else {
      errorsCopy.year = 'Please select a year';
      valid = false;
    }

    if(carName.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Please enter a name for your car';
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;

  }

  function updateTitle() {
    if (id) {
      return <h2 className="text-center">Update Car</h2>
    } else {
      return <h2 className="text-center">Add Car</h2>
    }
  }

  useEffect(() => {
    if (id) {
      getCar(parseInt(id)).then((response) => {

        const makeOption: Option = {
          label: response.data.make,
          value: response.data.make
        }

        const modelOption: Option = {
          label: response.data.model,
          value: response.data.model
        }

        const yearOption: Option = {
          label: response.data.year,
          value: response.data.year
        }

        setSelectedMake(makeOption);
        setSelectedModel(modelOption);
        setSelectedYear(yearOption);
        setCarName(response.data.name);
      }).catch(error => {
        console.error(error)
      })
    }
  }, [id])

  return (
    <div className="container">
      
      <button onClick={() => {navigator('/cars')}} className='btn btn-primary mt-5'>
        <i style={{ fontSize: '2rem' }} className="bi bi-house-fill"></i>
      </button>
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 ofsset-md-3">
          {
            updateTitle()
          }
          <div className="card-body">
            <form onSubmit={saveOrUpdateCar}>

              <div className="form-group mb-2">
                <CarSelector
                  make={selectedMake}
                  model={selectedModel}
                  year={selectedYear}
                  errors={errors}
                  onMakeChange={handleMakeChange}
                  onModelChange={handleModelChange}
                  onYearChange={handleYearChange}
                />
                {errors.make && <div className="invalid-feedback"> {errors.make} </div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Car Name:</label>
                <input
                  type='text'
                  placeholder="Enter a name for your car"
                  name='carName'
                  value={carName}
                  className={`form-control ${ errors.name ? 'is-invalid' : '' }`}
                  onChange={handleCarName}
                >
                </input>
                {errors.name && <div className="invalid-feedback"> {errors.name} </div>}
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CarComponent