import React,{ useEffect, useReducer } from 'react'
import { useHistory } from 'react-router';

const initialState = { isLoading: true }
export const LoadContext = React.createContext(initialState)
const loadReducer = (state, action) => {
		return { isLoading: action.isLoading }
}
const LoadProvider = (props) => {
	const history = useHistory()
	const [loadState, loadDispatch] = useReducer(loadReducer, initialState)
	const value = { ...loadState, loadDispatch }
	return(
		<LoadContext.Provider
			value={value}
		>
			{ props.children }
		</LoadContext.Provider>
	)
}
export default LoadProvider;
