import React,{ useReducer } from 'react'
import { useHistory } from 'react-router';
import { FormErrorState } from '../types/index'
import { ADD_ERRORS, RESET_ERRORS } from '../utils/formErrorActions'

const initialState: FormErrorState = { formErrors: [], formErrorDispatch: () => {} }
export const FormErrorContext = React.createContext(initialState)
const formErrorReducer = (state, action) => {
  console.log(action)
  switch(action.type){
    case ADD_ERRORS:
      return { ...state, formErrors: action.formErrors }
    case RESET_ERRORS:
      return initialState
    default:
      return state
  }
}
const FormErrorProvider = (props) => {
	// const history = useHistory()
	const [formErrorState, formErrorDispatch] = useReducer(formErrorReducer, initialState)
	const value: FormErrorState = { ...formErrorState, formErrorDispatch }
  console.log(value)
	return(
		<FormErrorContext.Provider
			value={value}
		>
			{ props.children }
		</FormErrorContext.Provider>
	)
}
export default FormErrorProvider;
