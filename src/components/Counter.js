import { useState } from "react"

function Counter() {
    const [count, setCount] = useState(2)
    const minNumber = 2

    function increaseCounter() {
        setCount((value) => value + 1)
    }

    function decreaseCounter() {
        if (count > minNumber) {
            setCount((value) => value - 1)
        }
    }
    return (
        <div style={{ width: '5rem' }}>
            <div className="d-flex justify-content-between">
                <button className="counter-active" onClick={increaseCounter}>+</button>
                <div className="d-flex justify-content-center align-items-center fs-5">
                    {count}
                </div>
                <button disabled={count <= minNumber} className={ count > minNumber ? 'counter-active':'counter' } onClick={decreaseCounter}>-</button>
            </div>
        </div>
    )
}

export default Counter