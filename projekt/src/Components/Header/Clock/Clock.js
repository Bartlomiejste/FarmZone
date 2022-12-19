import styleClock from "../Clock/Clock.module.css";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";

function Clock() {
  const [clockState, setClockState] = useState();
  const { isDarkTheme } = useContext(AppContext);
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <>
      <div className={`${isDarkTheme ? styleClock.dark : styleClock.clock}`}>
        {clockState}
      </div>
    </>
  );
}

export default Clock;
