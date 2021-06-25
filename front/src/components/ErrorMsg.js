import React, {useContext} from 'react'
import { ErrorContext } from '../store/ErrorProvider'

const ErrorMsg = () => {
	const { errorState } = useContext(ErrorContext)
	return(
		<div className={errorState.className}>
    	{errorState.msg}
		</div>
	)
}
export default ErrorMsg;