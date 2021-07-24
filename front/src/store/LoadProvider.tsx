import React,{ useReducer } from 'react'
import { useHistory } from 'react-router';
import { Load } from '../types/index'

const initialState: Load = { isLoading: true, loadDispatch: () => {} }
export const LoadContext = React.createContext(initialState)
const loadReducer = (state, action) => {
		return { ...state, isLoading: action.isLoading }
}
const LoadProvider = (props) => {
	const history = useHistory()
	const [loadState, loadDispatch] = useReducer(loadReducer, initialState)
	const value: Load = { ...loadState, loadDispatch }
	return(
		<LoadContext.Provider
			value={value}
		>
			{ props.children }
		</LoadContext.Provider>
	)
}
export default LoadProvider;
