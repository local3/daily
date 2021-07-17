import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const calendarStyles = {
  datePickerNavButton: {
    position: 'absolute',
    top: '125px'
  }
}

export default calendarStyles

export const useCalendarStyles = makeStyles({
  ...calendarStyles
  }
)