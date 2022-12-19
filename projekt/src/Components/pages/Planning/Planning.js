import React, { useState } from "react";
import stylePlanning from "../Planning/Planning.module.css";
import { Layout } from "../../Layout/Layout";
import AccordingOverview from "./AccordingOverview";
import { supabase } from "../../../supabase/config";

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
    <Layout>
      <div className={stylePlanning.planning__section}>
        <div className={stylePlanning.overview}>
          <p className={stylePlanning.overview__title}>Przeglądy</p>
          <form
            onSubmit={createServis}
            className={stylePlanning.overview__form}
          >
            <div>
              <label htmlFor="date">Data przeglądu: </label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className={stylePlanning.overview__inputDate}
              />
            </div>
            <div>
              <label htmlFor="vehicleName">Nazwa pojazdu: </label>
              <input
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className={stylePlanning.overview__inputVehicleName}
              />
            </div>
            <div>
              <label htmlFor="registrationNumber">Nr rejestracyjny: </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className={
                  stylePlanning.overview__inputvehicleRegistrationNumber
                }
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
        <AccordingOverview />
      </div>
    </Layout>
  );
};

export default Planning;
