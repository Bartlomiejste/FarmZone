import React from "react";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { useState } from "react";
import { supabase } from "../../../supabase/config";
import { useEffect } from "react";
import { Box } from "@mui/material";

const Failures = () => {
  const [cost, setCost] = useState();
  const [damageelement, setDamageElement] = useState();
  const [damage, setDamage] = useState([]);

  useEffect(() => {
    getDamage();
  }, []);

  const createDamage = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Damage")
      .insert([{ cost, damageelement }]);
    if (error) {
      throw error;
    }
    console.log(error);
    if (data) {
      setDamage(data);
    }
    window.location.reload();
  };

  const getDamage = async () => {
    let { data: Damage, error } = await supabase.from("Damage").select("*");
    if (error) {
      console.log(error);
    }
    if (Damage) {
      setDamage(Damage);
    }
  };

  damage.forEach(functionDamage);
  function functionDamage(cost) {
    let additionalDamage = 0;
    additionalDamage += cost.cost;
  }

  return (
    <Box>
      <form onSubmit={createDamage} className={styleAnalysis.form}>
        <p className={styleAnalysis.title}>Awarie</p>
        <Box>
          <label htmlFor="cost">Koszt awarii (zł)</label>
          <input
            type="number"
            onChange={(e) => setCost(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </Box>
        <Box>
          <label htmlFor="damageelement">Uszkodzony element</label>
          <input
            type="text"
            onChange={(e) => setDamageElement(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </Box>
        <button className={styleAnalysis.btn}>Dodaj awarię</button>
      </form>
    </Box>
  );
};

export default Failures;
