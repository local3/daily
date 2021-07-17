import React, { useContext } from 'react'
import { AlertContext } from '../store/AlertProvider'
type AleartContext = {
	msg: string
	status: number
	className: string
}
interface Props {
	
}
const AlertMsg: React.FC<Props> = () => {
	const alertState: AleartContext = useContext(AlertContext)
	return(
		<div className={alertState.className}>
    	{alertState.msg}
		</div>
	)
}
export default AlertMsg