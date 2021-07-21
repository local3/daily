import React from "react";
import Calendar from "../components/Calendar";
import DiaryTip from "../components/DiaryTip";
import "moment/locale/ja";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "../styles/css/react-dates-custom.scss";

function CalendarPage() {
  return (
    <>
      <Calendar/>
      <DiaryTip/>
    </>
  );
}

export default CalendarPage;
