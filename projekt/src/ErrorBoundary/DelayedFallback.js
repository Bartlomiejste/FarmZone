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
        <div className={style.error}>
          <h3 className={style.error__title}>Ups! Coś poszło nie tak...</h3>
          <p className={style.error__info}>Odśwież lub wróć na stronę główną</p>
          <button onClick={refreshPage} className={style.error__btn}>
            Odśwież
          </button>
        </div>
      )}
    </>
  );
};
export default DelayedFallback;
