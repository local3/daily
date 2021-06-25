import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import "moment/locale/ja";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "../styles/css/react-dates-custom.css";

function Calendar() {
  const dateFormat = "YYYY-MM-DD";
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
        withFullScreenPortal={true}
        hideKeyboardShortcutsPanel={true} // 右下の?ボタンをなくす
        date={date}
        onDateChange={(date) => setDate(date)}
        focused={focused}
        onFocusChange={(focused) => setFocused(focused)}
        // id="date"
        onClose={(focused) => setFocused(false)}
        isOutsideRange={ () => false}
      />
      <Link to={"/diary/" + moment(date).format(dateFormat)}>日記を書く</Link>
    </>
  );
}

export default Calendar;
