import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import style from "../ErrorBoundary/Error.module.css";

export const DelayedFallback = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      {show && (
        <Box className={style.error}>
          <Typography variant="h3" className={style.error__title}>
            Ups! Coś poszło nie tak...
          </Typography>
          <Typography className={style.error__info}>
            Odśwież lub wróć na stronę główną
          </Typography>
          <button onClick={refreshPage} className={style.error__btn}>
            Odśwież
          </button>
        </Box>
      )}
    </>
  );
};
export default DelayedFallback;
