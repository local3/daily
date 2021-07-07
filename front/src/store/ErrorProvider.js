import React,{ useEffect, useReducer } from 'react'
import { useHistory } from 'react-router';
import Axios from '../store/Axios'

const initialState = { msg: null, status: 200, className: null}
export const ErrorContext = React.createContext(initialState)
const errorReducer = (state, action) => {
	switch(action.status){
		case(422):
			return { ...state.errorState , msg: action.msg, className: 'warning'}
		case(0):
			return { initialState }
	}
}
const ErrorProvider = (props) => {
	const history = useHistory()
	const [errorState, errorDispatch] = useReducer(errorReducer, initialState)
	const value = {...errorState, errorDispatch}
	const resetErrorMsg = () => {
		errorDispatch({status: 0})
	}
	useEffect(resetErrorMsg, history)
	console.log('えらぷろ')
	return(
		<ErrorContext.Provider
			value={value}
		>
			<Axios/>
			{ props.children }
		</ErrorContext.Provider>
	)
}
export default ErrorProvider;