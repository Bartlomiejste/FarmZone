import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { Layout } from "../../Layout/Layout";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const Analysis = () => {
  const [machine, setMachine] = useState({
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
    getMachines();
  }, []);

  const getMachines = async () => {
    let { data: Machine, error } = await supabase.from("Machine").select("*");
    if (error) {
      setFormError(null);
      console.log(error);
    }
    if (Machine) {
      console.log("resss", Machine);
      const category = [];
      const price = [];
      const id = [];
      for (const i of Machine) {
        id.push(i.id);
        category.push(i.Category);
        price.push(i.Price);
        console.log(category);
        console.log(price);
      }
      setMachine({
        datasets: [
          {
            data: price,
            backgroundColor: ["Silver", "Purple", "Orange"],
          },
        ],
        labels: category,
      });
      setFormError(null);
    }
  };
  console.log(machine);

  return (
    <Layout>
      <div className={styleAnalysis.analysis__section}>
        <div
          className={styleAnalysis.analysis__pie}
          style={{ width: "20%", height: "20%" }}
        >
          <Doughnut data={machine} />
        </div>
      </div>
    </Layout>
  );
};

export default Analysis;
