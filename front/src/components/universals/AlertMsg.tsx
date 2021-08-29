import React, { useState, useContext } from 'react'
import { AlertContext } from '../../store/AlertProvider'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { useEffect } from 'react'
import { AlertState, AlertListState } from '../../types'
import STATUS_CODES from '../../utils/StatusCodes'

const AlertMsg = (props) => {
	// console.log(props)
	// const alertList = props.children
	const {alertList, alertDispatch} = useContext(AlertContext)

	const handleDeleteAlert = () => {
		if(alertList[props.alertIndex].status === 200){
			setTimeout(() => {
				// console.log(document.getElementById(`deleteAlert_${props.alertIndex}`))
				// const alertElement = document.getElementById(`deleteAlert_${props.alertIndex}`)
				// alertElement && alertElement.remove()
				alertDispatch({status: STATUS_CODES.RESET_CODE})
			}, 3000)
		}
	}

	useEffect(handleDeleteAlert, [])

	if(alertList.length > 0){
		return(
			<>
				<Alert id={`deleteAlert_${props.alertIndex}`} severity={alertList[props.alertIndex].severity} color={alertList[props.alertIndex].color}>
					{alertList[props.alertIndex].msg}
				</Alert>
			</>
		)
	}
	return null
}
export default AlertMsg
