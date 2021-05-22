import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { DayPickerRangeController } from 'react-dates';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


import 'moment/locale/ja';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import '../styles/css/react-dates-custom.css';



const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      width: '25ch',
    },
  })
);

function CustomReactDatesDateRangePicker(){
  const classes = useStyles();
  const dateFormat = 'YYYY/MM/DD';
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [display, setDisplay] = useState(false);

  return (
    <>
      <TextField
        className={classes.textField}
        label="react-dates"
        value={
          startDate && endDate
            ? `${startDate.format(dateFormat)} ~ ${endDate.format(dateFormat)}`
            : ''
        }
        onFocus={() => setDisplay(true)}
      />
      {display && (
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          navPrev={ // 前の月に戻るボタン ★
            <IconButton>
              <NavigateBeforeIcon />
            </IconButton>
          }
          navNext={ // 次の月に進むボタン ★
            <IconButton>
              <NavigateNextIcon />
            </IconButton>
          }
          // hideKeyboardShortcutsPanel={true} // 右下の?ボタンをなくす
          onFocusChange={(focusedInput) => {
            setFocusedInput(!focusedInput ? 'startDate' : focusedInput);
          }}
          onDatesChange={(selectedDates) => {
            if (focusedInput === 'startDate') {
              setStartDate(selectedDates.startDate);
            } else {
              setEndDate(selectedDates.endDate);
            }
          }}
          onOutsideClick={() => setDisplay(false)}
        />
      )}
    </>
  );
};

export default CustomReactDatesDateRangePicker;