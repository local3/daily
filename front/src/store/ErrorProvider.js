import React,{ useReducer } from 'react'

const initialState = { msg: null, status: 200 }
export const ErrorContext = React.createContext(initialState)
const errorReducer = (state, action) => {
		switch(action.status){
			case(422):
				return { ...state, msg: "エラーが発生しました", className: 'warning' }
		}
}
const ErrorProvider = (props) => {
	const [errorState, dispatch] = useReducer(errorReducer, initialState)
	const value = {errorState, dispatch}
	return(
		<ErrorContext.Provider
			value={value}
		>
			{ props.children }
		</ErrorContext.Provider>
	)
}
export default ErrorProvider;