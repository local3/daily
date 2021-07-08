import React, { useState } from 'react'
import moment from "moment";

const dateFormat = "YYYY-MM-DD";
const initialState = { date: moment().format(dateFormat) }

export const DateContext = React.createContext(initialState)

const DateProvider = (props) => {
	const [date, setDate] = useState(initialState)
	
	const updateDate = (selectedDate) => {
		console.log(moment(selectedDate).format(dateFormat))
		setDate(moment(selectedDate).format(dateFormat))
	}

	const value = { date, updateDate }
	console.log(value)
	return(
		<DateContext.Provider
			value={value}
		>
			{ props.children }
		</DateContext.Provider>
	)
}
export default DateProvider;
