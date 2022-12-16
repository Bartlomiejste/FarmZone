import React, { useState } from "react";
import stylePlanning from "../Planning/Planning.module.css";
import { Layout } from "../../Layout/Layout";
import Mains from "./Mains";
import According from "./According";
import { supabase } from "../../../supabase/config";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Planning = () => {
  const [dates, setDate] = useState();
  const [vehicleName, setVehicleName] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [distance, setDistance] = useState();
  const [all, setAll] = useState([]);
  const [datefromdata, setData] = useState([]);

  const a = new Date(dates);
  const bb = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate();
  const c = a.toDateString();
  const d = new Date().getTime();
  console.log(a);

  const createServis = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Servis")
      .insert([{ vehicleName, registrationNumber, dates, distance }]);
    if (error) {
      throw error;
    }
    console.log(error);
    if (data) {
      setAll(data);
    }
    window.location.reload();
  };

  useEffect(() => {
    createServis();
    getdates();
  }, []);

  const getdates = async () => {
    let { data, error } = await supabase.from("Servis").select("dates");
    if (error) {
      console.log(error);
    }
    if (data) {
      setData(data);
    }
  };

  return (
    <Layout>
      <div className={stylePlanning.planning__section}>
        <div className={stylePlanning.overview}>
          <h1>Dodaj przegląd / planowane prace</h1>
          <form onSubmit={createServis} className={stylePlanning.form}>
            <div>
              <label htmlFor="date">Data przeglądu: </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label=""
                  inputFormat="YYYY/MM/DD"
                  value={dates}
                  onChange={(value) => setDate(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div>
              <label htmlFor="vehicleName">Nazwa pojazdu: </label>
              <input
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="registrationNumber">Nr rejestracyjny: </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
        <According />
      </div>
    </Layout>
  );
};

export default Planning;
