import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

import { SingleDatePicker } from "react-dates";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import "moment/locale/ja";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "../styles/css/react-dates-custom.css";

function CustomReactDatesDateRangePicker() {
  const dateFormat = "YYYY-MM-DD";
  const [date, setDate] = useState();
  const [focused, setFocused] = useState(true);
  console.log(date)
  // const [existDates, setExistDates] = useState(["火曜日,　2021年6月8日"]);
  // const addSelectClassName = () => {
    // axios.get('/user_diary')
    //   .then(res => {
    //     setExistDates(res.data)
    //   })
    // setExistDates();
    // console.log(existDates);
    // existDates.forEach( e => {
    //   document
        // .querySelector(`aria-label=${e.date}`)
        // .addClassName("CalendarDay__selected", "CalendarDay__selected_3");
  //   });
  // };
  // useEffect(addSelectClassName);
  
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

export default CustomReactDatesDateRangePicker;
