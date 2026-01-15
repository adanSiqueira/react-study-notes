import { useState, useEffect } from "react";

function MyComponent() {

    const [count, setCount] = useState<number>(0);
    const [color, setColor] = useState<string>("green");

    useEffect(() => {
        document.title = `Count is ${count} ${color}`;
    }, [count, color]);

    function handleAddCount() {
        setCount(c => c + 1);
    }

    function handleSubtractCount() {
        setCount(c => c - 1);
    }

    return(
        <>
        <p>Count: {count}</p>
            <button onClick={handleAddCount}>Add</button>
            <button onClick={handleSubtractCount}>Subtract</button><br/>
            <p style={{color: color}}>This text is {color}</p>
            <button onClick={() => setColor("red")}>Red</button>
            <button onClick={() => setColor("blue")}>Blue</button>
            <button onClick={() => setColor("green")}>Green</button>
        
        </>
        
    )
}

export default MyComponent;