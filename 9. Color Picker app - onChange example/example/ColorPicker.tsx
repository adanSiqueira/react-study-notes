import { useState } from "react";


function ColorPicker() {

    const [color, setColor] = useState<string>("#FFFFFF");

    function handleColorChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setColor(event.target.value);
    }

    return(
        <div className = "color-picker-container">
            <h1>Color Picker</h1>
            <div className="color-display" style={{backgroundColor: color}}>
                <p>Selected color: {color}</p>
            </div>

            <label>Select a Color: </label>
            <input type="color" value={color} onChange={handleColorChange} />

            
 
        </div>
    );

}

export default ColorPicker;