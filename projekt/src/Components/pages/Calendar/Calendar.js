import React from "react";
import styleCalendar from "../Calendar/Calendar.module.css";
import { Layout } from "../../Layout/Layout";

const Calendar = () => {
  return (
    <Layout>
      <div className={styleCalendar.calendar__section}>Calendar</div>
    </Layout>
  );
};

export default Calendar;
