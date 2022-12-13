import React from "react";
import stylePlanning from "../Planning/Planning.module.css";
import { Layout } from "../../Layout/Layout";
import Mains from "./Mains";

const Planning = () => {
  return (
    <Layout>
      <div className={stylePlanning.planning__section}>
        <div className={stylePlanning.overview}>
          <h1>Dodaj przegląd/serwis</h1>
          <form>
            <div>
              <label htmlFor="date">Data przeglądu: </label>
              <input type="date" />
            </div>
            <div>
              <label htmlFor="vehicleName">Nazwa pojazdu: </label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="registrationNumber">Nr rejestracyjny: </label>
              <input type="text" />
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div>Historia przeglądów</div>
        <p>Do końca przeglądu zostało: </p>
        <Mains />
      </div>
    </Layout>
  );
};

export default Planning;
