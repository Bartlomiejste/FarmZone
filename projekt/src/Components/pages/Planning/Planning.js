import React, { useState } from "react";
import stylePlanning from "../Planning/Planning.module.css";
import { Layout } from "../../Layout/Layout";
import AccordingServis from "./AccordingServis";
import { supabase } from "../../../supabase/config";
import Working from "./Working";

const Planning = () => {
  const [dates, setDate] = useState();
  const [vehicleName, setVehicleName] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [all, setAll] = useState([]);

  const createServis = async (e) => {
    e.preventDefault();
    console.log({ vehicleName, registrationNumber, dates });
    const { data, error } = await supabase
      .from("Servis")
      .insert([{ vehicleName, registrationNumber, dates }]);
    if (error) {
      throw error;
    }
    console.log(error);
    if (data) {
      setAll(data);
    }
    window.location.reload();
  };

  return (
    <>
      <Layout>
        <div className={stylePlanning.planning__section}>
          <div className={stylePlanning.overview}>
            <form
              onSubmit={createServis}
              className={stylePlanning.overview__form}
            >
              <div className={stylePlanning.overview__title}>Przeglądy</div>
              <div>
                <label htmlFor="date">Data przeglądu: </label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className={stylePlanning.overview__input}
                  required
                />
              </div>
              <div>
                <label htmlFor="vehicleName">Nazwa pojazdu: </label>
                <input
                  required
                  type="text"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className={stylePlanning.overview__input}
                />
              </div>
              <div>
                <label htmlFor="registrationNumber">Nr rejestracyjny: </label>
                <input
                  required
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className={stylePlanning.overview__input}
                />
              </div>
              <button className={stylePlanning.overview__btn}>
                Dodaj przegląd
              </button>
            </form>
            <Working />
          </div>
          <AccordingServis />
        </div>
      </Layout>
    </>
  );
};

export default Planning;
