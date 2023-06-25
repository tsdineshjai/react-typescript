/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useReducer,
	ChangeEvent,
	ReactElement,
	useCallback,
	useContext,
} from "react";

type initialType = {
	count: number;
	text: string;
};
// eslint-disable-next-line react-refresh/only-export-components
export const initialState: initialType = {
	count: 0,
	text: "",
};
const enum REDUCER_ACTION_TYPE {
	INCREMENT,
	DECREMENT,
	INPUTCHANGE,
}
//enums are used as constants and also for type.

type ActionType = {
	type: REDUCER_ACTION_TYPE;
	payload?: string;
};

const reducer = (state: initialType, action: ActionType): initialType => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.INCREMENT:
			return { ...state, count: state.count + 1 };
		case REDUCER_ACTION_TYPE.DECREMENT:
			return { ...state, count: state.count - 1 };
		case REDUCER_ACTION_TYPE.INPUTCHANGE:
			return { ...state, text: action.payload ?? "" };

		default:
			return state;
	}
};

//custom Hoook
const useCounterContext = (initialState: initialType) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleIncrement = useCallback(function handleIncrement() {
		dispatch({
			type: REDUCER_ACTION_TYPE.INCREMENT,
		});
	}, []);

	const handleDecrement = useCallback(function handleDecrement() {
		dispatch({
			type: REDUCER_ACTION_TYPE.DECREMENT,
		});
	}, []);
	const handleInputChange = useCallback(function handleInputChange(
		e: ChangeEvent<HTMLInputElement>
	) {
		dispatch({
			type: REDUCER_ACTION_TYPE.INPUTCHANGE,
			payload: e.target.value,
		});
	},
	[]);

	return { state, handleIncrement, handleDecrement, handleInputChange };
};

type UseCounterContextType = ReturnType<typeof useCounterContext>;

const initialContextState: UseCounterContextType = {
	state: initialState,
	handleIncrement: () => {},
	handleDecrement: () => {},
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

//creating a context
export const CounterContext =
	createContext<UseCounterContextType>(initialContextState);

type ChildrenType = {
	children: ReactElement | undefined;
};

export const CounterProvider = ({
	children,
	...initialState
}: ChildrenType & initialType): ReactElement => {
	return (
		<CounterContext.Provider value={useCounterContext(initialState)}>
			{children}
		</CounterContext.Provider>
	);
};

type UseCounterHookType = {
	count: number;
	handleIncrement: () => void;
	handleDecrement: () => void;
};

export const useCounter = (): UseCounterHookType => {
	const {
		state: { count },
		handleIncrement,
		handleDecrement,
	} = useContext(CounterContext);
	return {
		count,
		handleIncrement,
		handleDecrement,
	};
};

type UseCounterTextHookType = {
	text: string;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const useCounterText = (): UseCounterTextHookType => {
	const {
		state: { text },
		handleInputChange,
	} = useContext(CounterContext);
	return {
		text,
		handleInputChange,
	};
};
