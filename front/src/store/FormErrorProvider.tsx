import React,{ useReducer, useEffect } from 'react'
import { useHistory } from 'react-router';
import { FormErrorState } from '../types/index'
import { ADD_ERRORS, RESET_ERRORS } from '../utils/formErrorActions'

const initialState: FormErrorState = { formErrors: [], formErrorDispatch: () => {} }
export const FormErrorContext = React.createContext(initialState)
const formErrorReducer = (state, action) => {
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
	const history = useHistory()
	const [formErrorState, formErrorDispatch] = useReducer(formErrorReducer, initialState)
	const value: FormErrorState = { ...formErrorState, formErrorDispatch }
  const resetFormError = () => {
		return history.listen(() => {
			formErrorDispatch({type: RESET_ERRORS})
		})
	}

	useEffect(resetFormError, [history])

	return(
		<FormErrorContext.Provider
			value={value}
		>
			{ props.children }
		</FormErrorContext.Provider>
	)
}
export default FormErrorProvider;
