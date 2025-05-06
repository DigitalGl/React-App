/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Button } from "./components/Button/Button.jsx";

// export const Counter = () => {
//     let count = 1;

//     return (
//         <button onClick={() => ++count}>
//           count is {count}
//         </button>
//     );
// };

export const Counter = () => {
  const [count, setCount] = useState(0)

  const setCounterHandler = () => {
    // setCount( count + 1)
    // setCount( count + 1)
    // setCount( count + 1)
    setCount((pref) => pref + 1);
    setCount((pref) => pref + 1);
    setCount((pref) => pref + 1);
  };

  return <Button onClick={setCounterHandler}>count is {count}</Button>;
};
