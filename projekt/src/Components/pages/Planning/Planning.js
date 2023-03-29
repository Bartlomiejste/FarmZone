import React, { useState } from "react";
import stylePlanning from "../Planning/Planning.module.css";
import { Layout } from "../../Layout/Layout";
import AccordingServis from "./AccordingServis";
import { supabase } from "../../../supabase/config";
import Working from "./Working";
import { Box } from "@mui/material";

const Planning = () => {
  const [dates, setDate] = useState();
  const [vehicleName, setVehicleName] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();

  const createServis = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Servis")
      .insert([{ vehicleName, registrationNumber, dates }]);
    if (error) {
      throw error;
    }
    console.log(error);
    if (data) {
      return data;
    }
    window.location.reload();
  };

  return (
    <Layout>
      <Box className={stylePlanning.planning__section}>
        <Box className={stylePlanning.overview}>
          <form
            onSubmit={createServis}
            className={stylePlanning.overview__form}
          >
            <Box className={stylePlanning.overview__title}>Przeglądy</Box>
            <Box>
              <label htmlFor="date">Data przeglądu: </label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className={stylePlanning.overview__input}
                required
              />
            </Box>
            <Box>
              <label htmlFor="vehicleName">Nazwa pojazdu: </label>
              <input
                required
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className={stylePlanning.overview__input}
              />
            </Box>
            <Box>
              <label htmlFor="registrationNumber">Nr rejestracyjny: </label>
              <input
                required
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className={stylePlanning.overview__input}
              />
            </Box>
            <button className={stylePlanning.overview__btn}>
              Dodaj przegląd
            </button>
          </form>
          <Working />
        </Box>
        <AccordingServis />
      </Box>
    </Layout>
  );
};

export default Planning;
