import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const calendarStyles = {
  datePickerNavButton: {
    position: 'absolute',
    top: '125px'
  },
  CardStyles: {
    width: 375,
    height: 120,
    margin:'auto',
    marginTop: 40,
    textAlign: 'left'
  }
}

export default calendarStyles

export const useCalendarStyles = makeStyles({
  ...calendarStyles
  }
)
