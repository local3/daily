import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { DateContext } from "../store/DateProvider";

import "moment/locale/ja";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "../styles/css/react-dates-custom.scss";

function Calendar() {
  const dateFormat = "YYYY-MM-DD";
  const { updateDate } = useContext(DateContext)

  const [date, setDate] = useState();
  const [focused, setFocused] = useState(true);
  const [existDates, setExistDates] = useState([]);
  const initExistDatesEffect = () => {
    axios.get('/diaries/exist_dates')
      .then(res => {
        setExistDates(res.data.exist_dates)
      })
  };
  const addClassName = () => {
    if(existDates.length > 0){
      existDates.forEach(date => {
        const element = document.querySelector(`td[aria-label='${date}']`)
        element && element.classList.add('exist_date')
      });
    }
  }

  const handleChangeDate = (date) => {
    setDate(date)
    updateDate(date)
  }
  useEffect(initExistDatesEffect, []);
  useEffect(addClassName, [existDates])

  return (
    <>
      <SingleDatePicker
        navPrev={
          // 前の月に戻るボタン ★
          <IconButton>
            <NavigateBeforeIcon />
          </IconButton>
        }
        navNext={
          // 次の月に進むボタン ★
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
        }
        withFullScreenPortal={false}
        hideKeyboardShortcutsPanel={true} // 右下の?ボタンをなくす
        date={date}
        onDateChange={(date) => handleChangeDate(date)}
        focused={focused}
        onFocusChange={(focused) => setFocused(focused)}
        // id="date"
        onClose={(focused) => setFocused(false)}
        isOutsideRange={ () => false}
        variant="inline"
      />
    </>
  );
}

export default Calendar;
