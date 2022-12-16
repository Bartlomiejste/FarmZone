import React, { useState, useEffect } from "react";
import Clock from "./Clock";

export function Mains() {
  const [timerDays, setTimerDays] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date("2023-03-21").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <div>
      <Clock timerDays={timerDays} />
    </div>
  );
}

export default Mains;
