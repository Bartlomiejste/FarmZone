import React, { useState } from "react";
import stylePlanning from "../Planning/Planning.module.css";
import { supabase } from "../../../supabase/config";

const Working = () => {
  const [typeofwork, setTypeOfWork] = useState();
  const [scheduledstartdate, setScheduledStartDate] = useState();
  const [numberoffield, setNumberOfField] = useState();
  const [work, setWork] = useState([]);

  const createWork = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Working")
      .insert([{ typeofwork, scheduledstartdate, numberoffield }]);
    if (error) {
      throw error;
    }
    console.log(error);
    if (data) {
      setWork(data);
      console.log(data);
    }
    window.location.reload();
  };
  return (
    <>
      <form onSubmit={createWork} className={stylePlanning.overview__form}>
        <p className={stylePlanning.overview__title}>Planowanie prac</p>
        <div>
          <label htmlFor="scheduledstartdate">Data planowanej pracy: </label>
          <input
            type="date"
            onChange={(e) => setScheduledStartDate(e.target.value)}
            className={stylePlanning.overview__input}
            required
          />
        </div>
        <div>
          <label htmlFor="typeofwork">Rodzaj pracy: </label>
          <input
            type="text"
            value={typeofwork}
            onChange={(e) => setTypeOfWork(e.target.value)}
            className={stylePlanning.overview__input}
            required
          />
        </div>
        <div>
          <label htmlFor="numberoffield">Nr działki: </label>
          <input
            type="text"
            value={numberoffield}
            onChange={(e) => setNumberOfField(e.target.value)}
            className={stylePlanning.overview__input}
            required
          />
        </div>
        <button className={stylePlanning.overview__btn}>Dodaj prace</button>
      </form>
    </>
  );
};

export default Working;
