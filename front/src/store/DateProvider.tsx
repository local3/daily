import React, { useState } from 'react'
import moment from "moment";
import { dateFormat } from '../utils/Date';

const initialState = moment().format(dateFormat)

export const DateContext = React.createContext(initialState)

const DateProvider = (props) => {
	const [date, setDate] = useState(initialState)
	
	const updateDate = (selectedDate) => {
		setDate(moment(selectedDate).format(dateFormat))
	}
	const value = { date, updateDate }
	return(
		<DateContext.Provider
			value={value}
		>
			{ props.children }
		</DateContext.Provider>
	)
}
export default DateProvider;
