import { useEffect, useState } from 'react';
import CarData from '../data/Car_Model_List.json';
import Select from 'react-select';

type Option = {
    label: string;
    value: string;
}

type CarSelectorProps = {
    onMakeChange: (make: Option | null) => void;
    onModelChange: (model: Option | null) => void;
    onYearChange: (year: Option | null) => void;
    errors: {
        make: string,
        model: string, 
        year: string,
        name: string
    };
    make: (Option | null);
    model: (Option | null);
    year: (Option | null);
}

const CarSelector: React.FC<CarSelectorProps> = ({ onMakeChange, onModelChange, onYearChange, errors, make, model ,year }) => {

    const [carMakes, setCarMakes] = useState<Option[]>([]);
    const [selectedMake, setSelectedMake] = useState<Option | null>(null);
    const [carModels, setCarModels] = useState<Option[]>([]);
    const [selectedModel, setSelectedModel] = useState<Option | null>(null);
    const [carYears, setCarYears] = useState<Option[]>([]);

    useEffect(() => {
        try {
            const uniqueMakes = [...new Set(CarData.cars.map((car) => car.Make))];
            uniqueMakes.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            const makeOptions = uniqueMakes.map((make) => ({ label: make, value: make }));
            setCarMakes(makeOptions);
        } catch (error) {
            console.log("Error fetching car makes.");
        }
    }, []);

    useEffect(() => {
        if (selectedMake) {
            try {
                const modelsPerMake = CarData.cars.filter((car) => car.Make === selectedMake.value);
                const uniqueModels = [...new Set(modelsPerMake.map((car) => car.Model))];
                uniqueModels.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
                const modelOptions = uniqueModels.map((model) => ({ label: model, value: model }));
                setCarModels(modelOptions);
            } catch (error) {
                console.log("Error fetching car models.");
            }
        } else {
            setCarModels([]);
        }
        setSelectedModel(null);
        setCarYears([]);
    }, [selectedMake]);

    useEffect(() => {
        if (selectedMake && selectedModel) {
            try {
                const yearsPerModel = CarData.cars.filter((car) => car.Make === selectedMake.value && car.Model === selectedModel.value);
                const uniqueYears = [...new Set(yearsPerModel.map((car) => car.Year))];
                uniqueYears.sort((a, b) => b - a);
                const yearOptions = uniqueYears.map((year) => ({ label: year.toString(), value: year.toString() }));
                setCarYears(yearOptions);
            } catch (error) {
                console.log("Error fetching car years.");
            }
        }
    }, [selectedModel, selectedMake]);

    return (
        <div>
            <label>
                Pick your car's make:
                <Select
                    value={make}
                    className={`margin mt-2 form-control ${errors.make ? 'is-invalid' : ''}`} 
                    options={carMakes}
                    onChange={(selectedOption) => {
                        setSelectedMake(selectedOption);
                        onMakeChange(selectedOption);
                    }}

                />
                <div className="invalid-feedback">
                    Please select a make.
                </div>
            </label>
            <br />
            <label className='margin mt-2'>
                Pick your car's model:
                <Select
                    value={model}
                    className={`margin mt-2 form-control ${errors.model ? 'is-invalid' : ''}`} 
                    options={carModels}
                    onChange={(selectedOption) => {
                        setSelectedModel(selectedOption);
                        onModelChange(selectedOption);
                    }}
                />
                <div className="invalid-feedback">
                    Please select a model.
                </div>
            </label>
            <br />
            <label className='margin mt-2'>
                Pick your car's year:
                <Select
                    value={year}
                    className={`margin mt-2 form-control ${errors.year ? 'is-invalid' : ''}`} 
                    options={carYears}
                    onChange={(selectedOption) => {
                        onYearChange(selectedOption);
                    }}
                />
                <div className="invalid-feedback">
                    Please select a year.
                </div>
            </label>
        </div>
    );
}

export default CarSelector;
