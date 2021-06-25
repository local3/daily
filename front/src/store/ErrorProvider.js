import React,{ useEffect, useReducer } from 'react'
import { useHistory } from 'react-router';

const initialState = { msg: null, status: 200 }
export const ErrorContext = React.createContext(initialState)
const errorReducer = (state, action) => {
		switch(action.status){
			case(422):
				return { ...state, msg: action.msg, className: 'warning'}
			case(0):
				return { initialState }
		}
}
const ErrorProvider = (props) => {
	const history = useHistory()
	const [errorState, dispatch] = useReducer(errorReducer, initialState)
	const value = {errorState, dispatch}
	const resetErrorMsg = () => {
		dispatch({status: 0})
	}
	useEffect(resetErrorMsg, history)
	return(
		<ErrorContext.Provider
			value={value}
		>
			{ props.children }
		</ErrorContext.Provider>
	)
}
export default ErrorProvider;