import { useCounter } from "./context/CounterContext";
import { useCounterText } from "./context/CounterContext";

const Counter = () => {
	const { count, handleIncrement, handleDecrement } = useCounter();
	const { text, handleInputChange } = useCounterText();

	return (
		<>
			<h1>{count}</h1>
			<div>
				<button onClick={handleIncrement}>+</button>
				<button onClick={handleDecrement}>-</button>
			</div>
			<input type="text" onChange={handleInputChange} />
			<h2>{text}</h2>
		</>
	);
};
export default Counter;
