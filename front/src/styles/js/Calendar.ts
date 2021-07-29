import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const calendarStyles = {
  datePickerNavButton: {
    position: 'absolute',
    top: '125px'
  },
  DrawerStyle: {
    zIndex: `${0}!important`,
    backgroundColor: `${themes.clear}!important`,
    position: 'static!important',
  },
  TipPaperStyle: {
    height: 150,
    padding: 25
  },
  TipDateStyle: {
    fontWeight: 600
  }
}

export default calendarStyles

export const useCalendarStyles = makeStyles({
  ...calendarStyles
  }
)
