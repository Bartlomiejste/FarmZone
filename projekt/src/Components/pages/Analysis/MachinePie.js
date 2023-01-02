import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

const MachinePie = () => {
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
      let name = Machine.map((name) => name.Category);
      const id = [];
      let one = [];
      let sumTotal = 0;

      for (const i of Machine) {
        sumTotal += i.Price;
      }

      for (const i of Machine) {
        let percentage = ((i.Price * 100) / sumTotal).toFixed(2);
        one.push(percentage);
      }
      setMachine({
        datasets: [
          {
            data: one,
            backgroundColor: [
              "Silver",
              "Purple",
              "Orange",
              "Black",
              "Gold",
              "Blue",
              "Red",
            ],
          },
        ],
        labels: name,
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
        <Doughnut data={machine} />
      </div>
    </>
  );
};

export default MachinePie;
