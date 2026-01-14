import { useState } from 'react';

function Counter(){

    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }

    const reset = () => {
        setCount(0);
    }

    return (
        <div className="counter-container">
            <p className="count-display">Counter: {count}</p>
            <button onClick={increment} className="counter-button">Increment</button>
            <button onClick={decrement} className="counter-button">Decrement</button>
            <button onClick={reset} className="counter-button">Reset</button>
        </div>
    );

}

export default Counter;