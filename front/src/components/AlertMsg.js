import React, { useContext } from 'react'
import { AlertContext } from '../store/AlertProvider'

const AlertMsg = () => {
	const alertState = useContext(AlertContext)
	return(
		<div className={alertState.className}>
    	{alertState.msg}
		</div>
	)
}
export default AlertMsg