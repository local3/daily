import {useContext} from 'react'
import { ErrorContext } from '../store/ErrorProvider'

const ErrorMsg = () => {
	const { errorState } = useContext(ErrorContext)
	return(
    {errorState}
	)
}
export default ErrorMsg;