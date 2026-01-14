import { useState } from "react";

function MyComponent() {

    const [count, setCount] = useState<number>(0);

    function handleIncrement() {
        setCount(c => c + 1);
    }

    function handleDecrement() {
        setCount(c => c - 1);
    }

    function handleReset() {
        setCount(0);
    }


    return(
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleReset}>Reset</button>
        </div>    );

}

export default MyComponent;