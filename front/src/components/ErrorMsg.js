import React, { useContext } from 'react'
import { ErrorContext } from '../store/ErrorProvider'

const ErrorMsg = () => {
	const { errorState } = useContext(ErrorContext)
	return(
		<>
    	{errorState.msg}
		</>
	)
}
export default ErrorMsg