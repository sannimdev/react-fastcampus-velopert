import React, { useState } from 'react';

function Counter() {
    const [number, setNumber] = useState(0);
    const onIncrease = () => {
        // console.log('+1');
        // setNumber(number + 1);
        // 😄✔ 함수형 업데이트 함수를 사용해야 할 때가 온다. (최적화할 때)
        setNumber((prevNumber) => prevNumber + 1);
    };
    const onDecrease = () => {
        // console.log('-1');
        // setNumber(number - 1);
        setNumber((prevNumber) => prevNumber - 1);
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}
export default Counter;
