import { useState } from "react";


function MyComponent() {

    const [food, setFoods] = useState<Array<string>>(["Apple", "Banana", "Orange"]);

    function handleAddFood() {
        const newFood = (document.getElementById("foodInput") as HTMLInputElement)!.value;
        setFoods(f => [...f, newFood]);
        (document.getElementById("foodInput") as HTMLInputElement).value = "";
    }

    function handleRemoveFood(index: number): void {
        setFoods(f => f.filter((_, i) => i !== index));
    }


    
    return(
        <div>
            <h2>List of Food</h2>
            <ul>
                {food.map((item, index) => (
                    <li key={index} onClick={() => handleRemoveFood(index)}>
                        {item}
                    </li>
                ))}
            </ul>
            <input id="foodInput" type="text" placeholder="Enter food item" />
            <button onClick={handleAddFood}>Add Food</button>
            
            


        </div>


    );

}

export default MyComponent;