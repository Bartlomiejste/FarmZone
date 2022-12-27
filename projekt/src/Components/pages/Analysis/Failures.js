import React from "react";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { useState } from "react";
const Failures = () => {
  const [cost, setCost] = useState();
  const [device, setDevice] = useState();

  const createDamage = "s";
  return (
    <div>
      <form onSubmit={createDamage} className={styleAnalysis.form}>
        <p className={styleAnalysis.title}>Awarie</p>
        <div>
          <label htmlFor="cost">Koszt awarii (zł)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <div>
          <label htmlFor="device">Uszkodzony element</label>
          <input
            type="text"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <button className={styleAnalysis.btn}>Dodaj awarię</button>
      </form>
    </div>
  );
};

export default Failures;
