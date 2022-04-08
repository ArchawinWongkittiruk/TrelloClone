import {useReducer, useMemo, createContext} from 'react';
import {reducers, states} from '../reducers';
import combineReducers from '../utils/combineReducers';

export const Context = createContext()

export default function useStore(reducer) {
	let requestedReducers = Object.fromEntries(Object.entries(reducers).filter(([key,])=>reducer.includes(key)))
	let requestedStates = Object.fromEntries(Object.entries(states).filter(([key,])=>reducer.map(e=>e+'State').includes(key)))

	const [state, dispatch] = useReducer(combineReducers(requestedReducers), requestedStates)

    const store = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return {store, Context}

}