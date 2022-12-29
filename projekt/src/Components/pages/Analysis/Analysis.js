import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { Layout } from "../../Layout/Layout";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Failures from "./Failures";
import Crops from "./Crops";
import FailuresTable from "./FailuresTable";
import CropsTable from "./CropsTable";
import CropsPie from "./CropsPie";
import MachinePie from "./MachinePie";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const Analysis = () => {
  return (
    <Layout>
      <div className={styleAnalysis.analysis__section}>
        <div className={styleAnalysis.formStyle}>
          <div>
            <Failures />
          </div>
          <div className={styleAnalysis.table}>
            <FailuresTable />
          </div>

          <div>
            <Crops />
          </div>
          <div className={styleAnalysis.table}>
            <CropsTable />
          </div>
        </div>
        <div className={styleAnalysis.pie}>
          <MachinePie />
          <CropsPie />
        </div>
      </div>
    </Layout>
  );
};

export default Analysis;
