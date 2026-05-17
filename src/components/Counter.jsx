import {useState} from 'react';
function Counter(){
    const [count, setCount]=useState(0);
    const Increment=()=> setCount(count+1)
    const Decrement=() =>  setCount(count-1);
    const Reset=() => setCount(count==0)
        

    return(
        <div>
            <p>Count:{count} </p>
            <button onClick={Increment}>Increment</button><br/>
            <button onClick={Decrement}>Decrement</button><br/>
            <button onClick={Reset}>Reset</button>
        </div>
    );
}
export default Counter