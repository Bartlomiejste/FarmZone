import React from "react";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { useState } from "react";
import { supabase } from "../../../supabase/config";
import { useEffect } from "react";

const Damages = () => {
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

  let additionalDamage = 0;
  damage.forEach(functionDamage);
  function functionDamage(cost) {
    additionalDamage += cost.cost;
  }

  return (
    <div>
      <form onSubmit={createDamage} className={styleAnalysis.form}>
        <p className={styleAnalysis.title}>Awarie</p>
        <div>
          <label htmlFor="cost">Koszt awarii (zł)</label>
          <input
            type="number"
            onChange={(e) => setCost(e.target.value)}
            className={styleAnalysis.input}
            required
          />
          <p>{additionalDamage}</p>
        </div>
        <div>
          <label htmlFor="damageelement">Uszkodzony element</label>
          <input
            type="text"
            onChange={(e) => setDamageElement(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <button className={styleAnalysis.btn}>Dodaj awarię</button>
      </form>
    </div>
  );
};

export default Damages;
