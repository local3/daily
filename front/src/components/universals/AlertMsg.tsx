import React, { useContext } from 'react'
import { AlertContext } from '../../store/AlertProvider'
import Alert from '@material-ui/lab/Alert'

const AlertMsg: React.FC = () => {
	const alertState = useContext(AlertContext)

	return(
		<>
			{ alertState.msg && 
				<Alert severity={alertState.severity} color={alertState.color}>
					{alertState.msg}
				</Alert>
			}
		</>
	)
}
export default AlertMsg
