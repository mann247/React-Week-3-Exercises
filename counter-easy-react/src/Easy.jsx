import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Counter(){
    const [count, setCount] = useState(0);


    const increment = () => {
        setCount(prevCount => prevCount +1);
    };

    const decrement = () => {
        setCount(prevCount => prevCount -1);
    };

    return (
        <div> 
            <h1> Counter: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

export default Counter;