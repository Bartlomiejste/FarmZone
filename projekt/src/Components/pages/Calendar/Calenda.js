import React from "react";
import styleCalendar from "../Calendar/Calendar.module.css";
import { Layout } from "../../Layout/Layout";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const Calenda = () => {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);
  const [date4, setDate4] = useState(null);
  const [date5, setDate5] = useState(null);
  const [date6, setDate6] = useState(null);
  const [date7, setDate7] = useState(null);
  const [date8, setDate8] = useState(null);
  const [date9, setDate9] = useState(null);
  const [date10, setDate10] = useState(null);
  const [date11, setDate11] = useState(null);
  const [date12, setDate12] = useState(null);
  const [date13, setDate13] = useState(null);
  const [date14, setDate14] = useState(null);
  const [dates1, setDates1] = useState(null);
  const [dates2, setDates2] = useState(null);

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  let invalidDates = [today];

  addLocale("es", {
    firstDayOfWeek: 1,
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  const dateTemplate = (date) => {
    if (date.day > 10 && date.day < 15) {
      return (
        <strong
          style={{
            textDecoration: "line-through",
          }}
        >
          {date.day}
        </strong>
      );
    }

    return date.day;
  };
  return (
    <Layout>
      <div className={styleCalendar.calendar__section}>
        <div>
          <Calendar
            value={date14}
            onChange={(e) => setDate14(e.value)}
            inline
            showWeek
          />
        </div>
      </div>
    </Layout>
  );
};

export default Calenda;
