import { useState } from "react";

interface Car {
    year: number;
    make: string;
    model: string;
}

function MyComponent() {

    const [cars, setCars] = useState<Array<object>>([]);
    const [carYear, setCarYear] = useState<number>(new Date().getFullYear());
    const [carMake, setCarMake] = useState<string>("");
    const [carModel, setCarModel] = useState<string>("");

    function handleAddCar() {
        const newCar: Car = {
            year: carYear, 
            make: carMake, 
            model: carModel
        };

        setCars(c => [...c, newCar]);
        setCarYear(new Date().getFullYear());
        setCarMake("");
        setCarModel("");
    }

    function handleRemoveCar(index: number) {
        setCars(cars.filter((_, i) => i !== index));        
    }

    function handleCarYearChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCarYear(Number(event.target.value));
    }

    function handleCarMakeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCarMake(event.target.value);
    }

    function handleCarModelChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCarModel(event.target.value);
    }

   
    return(
        <div>
            <h2>Car Inventory</h2>
            <ul>
                {cars.map((car, index) => (
                    <li key={index} onClick = {() => handleRemoveCar(index)}>
                        {
                        `${(car as Car).year} 
                        ${(car as Car).make} 
                        ${(car as Car).model}`
                        }
                    </li>))}


            </ul>

            <input type="number" value={carYear} onChange={handleCarYearChange}/><br/>
            <input type="text" value={carMake} onChange={handleCarMakeChange} placeholder = "Enter car make"/><br/>
            <input type="text" value={carModel} onChange={handleCarModelChange} placeholder = "Enter car model"/><br/>
            <button onClick={handleAddCar}>Add Car</button>
            
        </div>


    );

}

export default MyComponent;