import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import { IconButton, Box } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { DateContext } from "../store/DateProvider";
import "moment/locale/ja";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useCalendarStyles } from "../styles/js/Calendar";
import "../styles/css/react-dates-custom.scss";
import { ExistDate } from '../types/index'
import { axiosWithAlert } from '../store/Axios'

function Calendar() {
  const calendarClasses = useCalendarStyles()
  const { globalDate, updateDate } = useContext(DateContext)
  const [date, setDate] = useState<string>(moment());
  const [focused, setFocused] = useState(true);
  const [existDates, setExistDates] = useState<ExistDate[]>([]);
  console.log(existDates);
  // カレンダー画面のinput欄を削除
  const element = document.getElementsByClassName('DateInput')[0]
  element?.remove()
  
  // 日記が書いてある日の取得
  const initExistDatesEffect = () => {
    axiosWithAlert.get('/diaries/exist_dates')
      .then(res => {
        console.log(res)
        setExistDates(res.data.existDiarysInfo)
      })
  };

  // すでに日記を書いてある日にちに対してクラスを付加して色をつける処理
  const addClassName = () => {
    console.log("addClassNAme")
    console.log(existDates)
    if(existDates && existDates.length > 0){
      console.log(existDates)
      existDates.forEach(date => {
        // react-datesの性質上、td[aria-label='○曜日. YYYY年MM月DD日']というaria-labelが各日にちについている。
        // rails側でaria-labelの形式に合わせた形でフォーマットしてある。
        const element = document.querySelector(`td[aria-label='${date.date}']`)
        // rails側でclass名をセットしてあるので、それを展開して複数クラスを付加していく
        element && element.classList.add(...date.classNames)
      });
    }
  }

  const handleChangeDate = (date: string) => {
    // このコンポーネント内で、dateという変数を扱う用。useContextでstore/Date.jsの値を使えばいらないかも？
    setDate(date)
    // Footerとの連携用。選択した日にちの日記に「書く」ボタンでリダイレクトできるようにする
    updateDate(date)
    // addClassName()
  }
  useEffect(initExistDatesEffect, []);
  // 日記が存在している日付には色をつける。
  useEffect(addClassName, [existDates])
  // ピンポイントでクラス付加する方がいいかも？
  // 日付選択時、focusedのクラスで、exit_dateなどのクラスが上書きされてしまう現象が発生
  // ー＞日付選択をするたびにクラスを付け直せばok
  useEffect(()=>{setDate(moment(globalDate))}, [globalDate])
  useEffect(addClassName, [date])
  return (
    <>
      <SingleDatePicker
        navPrev={
          // 前の月に戻るボタン ★
          <IconButton onClick={addClassName} className={calendarClasses.datePickerNavButton}>
            <NavigateBeforeIcon />
          </IconButton>
        }
        navNext={
          // 次の月に進むボタン ★
          <IconButton onClick={addClassName} className={calendarClasses.datePickerNavButton}>
            <NavigateNextIcon />
          </IconButton>
        }
        withFullScreenPortal={false}
        disabled={false}
        hideKeyboardShortcutsPanel={true} // 右下の?ボタンをなくす
        date={date}
        onDateChange={(date: string) => handleChangeDate(date)}
        focused={focused} // デフォルトではfocus=inputを洗濯中の時。強制的に常に表示にする
        onFocusChange={() => setFocused(focused)}
        isOutsideRange={ () => false}
        numberOfMonths={1} // 表示するのを１つの月だけにする
        verticalSpacing={0} // カレンダーとinputの間にでる三角吹き出しを消す
      />
    </>
  );
}

export default Calendar;
