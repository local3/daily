import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const calendarStyles: any = {
  // Calendar.tsx
  datePickerNavButton: {
    position: 'absolute',
    top: '125px'
  },
  // DiaryTip.tsx
  drawerStyle: {
    zIndex: `${0}!important`,
    // backgroundColor: `${themes.clear}!important`,
    position: 'relative!important',
  },
  tipPaperStyle: {
    height: '27vh',
  },
  tipDateStyle: {
    fontWeight: 600,
    backgroundColor: themes.gray,
    padding: '8px 20px 5px'
  },
  tipContentStyle: {
    padding: 20
  }
}

export default calendarStyles

export const useCalendarStyles = makeStyles({
  ...calendarStyles
  }
)
