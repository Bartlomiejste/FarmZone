import React from "react";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { useState } from "react";

const Crops = () => {
  const [grain, setGrain] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const createCrop = "s";
  return (
    <div>
      <form onSubmit={createCrop} className={styleAnalysis.form}>
        <p className={styleAnalysis.title}>Zebrane plony</p>
        <div>
          <label htmlFor="grain">Rodzaj plonu</label>
          <input
            type="text"
            value={grain}
            onChange={(e) => setGrain(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Ilość zebranego plonu (w tonach)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={styleAnalysis.input}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Cena za tonę (zł)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
