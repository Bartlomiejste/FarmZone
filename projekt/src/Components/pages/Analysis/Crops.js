import React from "react";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { useState } from "react";
import { supabase } from "../../../supabase/config";
import { useEffect } from "react";

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [kindofcrops, setKindOfCrops] = useState();
  const [quantitycrops, setQuantityCrops] = useState();
  const [pricecrops, setPriceCrops] = useState();

  useEffect(() => {
    getCrops();
  }, []);

  const createCrops = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Crops")
      .insert([{ kindofcrops, quantitycrops, pricecrops }]);
    if (error) {
      throw error;
    }
    console.log(error);
    if (data) {
      setCrops(data);
    }
    window.location.reload();
  };

  const getCrops = async () => {
    let { data: Crops, error } = await supabase.from("Crops").select("*");
    if (error) {
      console.log(error);
    }
    if (Crops) {
      setCrops(Crops);
    }
  };

  return (
    <div>
      <form onSubmit={createCrops} className={styleAnalysis.form}>
        <p className={styleAnalysis.title}>Zebrane plony</p>
        <div>
          <label htmlFor="kindofcrops">Rodzaj plonu</label>
          <input
            type="text"
            value={kindofcrops}
            onChange={(e) => setKindOfCrops(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <div>
          <label htmlFor="quantitycrops">
            Ilość zebranego plonu (w tonach)
          </label>
          <input
            type="number"
            value={quantitycrops}
            onChange={(e) => setQuantityCrops(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <div>
          <label htmlFor="pricecrops">Cena za tonę (zł)</label>
          <input
            type="number"
            value={pricecrops}
            onChange={(e) => setPriceCrops(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <button className={styleAnalysis.btn}>Dodaj plony</button>
      </form>
    </div>
  );
};

export default Crops;
