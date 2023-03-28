import React from "react";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { Layout } from "../../Layout/Layout";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import Failures from "./Failures";
import Crops from "./Crops";
import FailuresTable from "./FailuresTable";
import CropsTable from "./CropsTable";
import CropsPie from "./CropsPie";
import MachinePie from "./MachinePie";
import { Box } from "@mui/material";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const Analysis = () => {
  return (
    <Layout>
      <Box className={styleAnalysis.analysis__section}>
        <Box className={styleAnalysis.formStyle}>
          <Box>
            <Failures />
          </Box>
          <Box className={styleAnalysis.table}>
            <FailuresTable />
          </Box>

          <Box>
            <Crops />
          </Box>
          <Box className={styleAnalysis.table}>
            <CropsTable />
          </Box>
        </Box>
        <Box>
          <Box className={styleAnalysis.titleProcentage}>
            Podsumowanie procentowe:
          </Box>
          <Box className={styleAnalysis.pie}>
            <MachinePie />
            <CropsPie />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Analysis;
