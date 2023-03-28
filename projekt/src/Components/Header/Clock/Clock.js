import styleClock from "../Clock/Clock.module.css";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import { Box } from "@mui/material";

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
    <Box className={`${isDarkTheme ? styleClock.dark : styleClock.clock}`}>
      {clockState}
    </Box>
  );
}

export default Clock;
