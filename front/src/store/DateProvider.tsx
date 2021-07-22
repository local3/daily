import React, { useState } from 'react'
import moment from "moment";
import { dateFormat } from '../utils/Date';
import { DateContextType } from '../types'
const initialState: DateContextType = {
	date: moment().format(dateFormat),
	updateDate: () => {}
}	

export const DateContext = React.createContext(initialState)

const DateProvider = (props) => {
	const [date, setDate] = useState<string>(initialState.date)
	
	const updateDate = (selectedDate: string) => {
		setDate(moment(selectedDate).format(dateFormat))
	}
	const value: DateContextType = { date, updateDate }
	return(
		<DateContext.Provider
			value={value}
		>
			{ props.children }
		</DateContext.Provider>
	)
}
export default DateProvider;
