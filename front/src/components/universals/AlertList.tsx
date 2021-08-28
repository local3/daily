import React, { useState, useContext } from 'react'
import { AlertContext } from '../../store/AlertProvider'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { useEffect } from 'react'
import { AlertState, AlertListState } from '../../types'
import AlertMsg from './AlertMsg'

const AlertList = (props) => {
	const {alertList} = useContext(AlertContext)
	if(alertList.length > 0){
		return(
			<>
				{console.log(alertList)}
				{ 
					alertList.map((alert, i) => (
						<AlertMsg
							key={i}
							alert={alert}
							alertIndex={i}
						>
							{/* {alert.msg} */}
						</AlertMsg>
					))
				}
			</>
		)
	}
	return null
}
export default AlertList
