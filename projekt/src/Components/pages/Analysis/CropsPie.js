import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import styleAnalysis from "../Analysis/Analysis.module.css";

import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Crops from "./Crops";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

const CropsPie = () => {
  const [crops, setCrops] = useState({
    datasets: [
      {
        data: "",
        backgroundColor: "",
      },
    ],
    labels: "",
  });

  const [errors, setFormError] = useState();

  useEffect(() => {
    getCrops();
  }, []);

  const getCrops = async () => {
    let { data: Crops, error } = await supabase.from("Crops").select("*");
    if (error) {
      setFormError(null);
      console.log(error);
    }
    if (Crops) {
      const id = [];
      let quantitycrops = [];
      let pricecrops = [];
      const kindofcrops = ["Rzepak", "Kukurydza", "Żyto", "Pszenica"];
      let gain = [];
      //   let sum = [0];
      //   gain.map((element) => {
      //     sum += element;
      //   });
      //   let percentage = ((sum * 100) / sum).toFixed(2) + "%";
      //   console.log(percentage);

      for (const i of Crops) {
        id.push(i.id);
        quantitycrops.push(i.quantitycrops);
        pricecrops.push(i.pricecrops);
        gain.push(i.quantitycrops * i.pricecrops);
        //potrzebuje zsumować cały zysk = 7200+10500+16000+8500 = wartość, żeby każdą wartość podzielić przez sumę i mieć %
      }
      setCrops({
        datasets: [
          {
            data: gain,
            backgroundColor: [
              "Silver",
              "Purple",
              "Orange",
              "Blue",
              "Red",
              "Yellow",
            ],
          },
        ],
        labels: kindofcrops,
      });
      setFormError(null);
    }
  };
  return (
    <>
      <div
        className={styleAnalysis.analysis__pie}
        style={{ width: "20%", height: "20%" }}
      >
        <Doughnut data={crops} />
      </div>
    </>
  );
};

export default CropsPie;
