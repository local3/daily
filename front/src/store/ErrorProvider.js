import React,{ useReducer } from 'react'

const initialState = { errMsg: null }
export const ErrorContext = React.createContext(initialState)
const errorReducer = (state, action) => {
		switch(action){
			case(422):
				return { ...state, msg: action.msg }
		}
}

const ErrorProvider = (props) => {
	const [errorState, dispatch] = useReducer(errorReducer, initialState)
	const value = {errorState, dispatch}
	console.log(errorState)
	console.log(dispatch)
	// console.log(props)
	// console.log(children)
	// console.log(props.children)
	// console.log(typeof(props.children))
	return(
		<ErrorContext.Provider
			value={value}
		>
			{ props.children }
		</ErrorContext.Provider>
	)
}
export default ErrorProvider;