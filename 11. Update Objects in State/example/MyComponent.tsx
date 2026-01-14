import { useState } from "react";

interface Car {
    year: number;
    make: string;
    model: string;
}

function MyComponent() {

    const [car, setCar] = useState<Car>({year: 2020, make: "Toyota", model: "Corolla"});

    function handleYearChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setCar(car => ({...car, year: Number(event.target.value)}));
    }

    function handleMakeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setCar(car => ({...car, make: String(event.target.value)}));
    }

    function handleModelChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setCar(car => ({...car, model: String(event.target.value)}));
    }
    
    return(
        <div>
            <p><b>Car Details:</b></p>
            <p>Year: {car.year}</p>
            <p>Make: {car.make}</p>
            <p>Model: {car.model}</p>

            <input type="number" value = {car.year} onChange={handleYearChange}/>
            <input type="text" value = {car.make} onChange={handleMakeChange}/>
            <input type="text" value = {car.model} onChange={handleModelChange}/>
        </div>

    );

}

export default MyComponent;