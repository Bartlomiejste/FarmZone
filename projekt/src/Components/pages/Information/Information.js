import React, { useEffect } from "react";
import styleInformation from "../Information/Information.module.css";
import { Layout } from "../../Layout/Layout";
import { Box } from "@mui/material";

const Information = () => {
  useEffect(() => {}, []);

  const farmerPage = () => {
    window.open("https://www.farmer.pl/");
  };
  const farmPage = () => {
    window.open("https://www.wrp.pl/");
  };
  const agroPage = () => {
    window.open("https://www.agropolska.pl/aktualnosci/polska/");
  };
  const infoPage = () => {
    window.open("https://wiescirolnicze.pl/");
  };
  const agroProfilPage = () => {
    window.open("https://agroprofil.pl/");
  };
  const stockMarketPage = () => {
    window.open("https://igrit.pl/");
  };

  return (
    <Layout>
      <Box className={styleInformation.information__section}>
        <p className={styleInformation.information__title}>
          Najnowsze Informacje
        </p>
        <Box className={styleInformation.information__grid}>
          <Box className={styleInformation.one} onClick={() => farmerPage()}>
            <Box className={styleInformation.information__one_img}></Box>
          </Box>
          <Box className={styleInformation.two} onClick={() => farmPage()}>
            <Box className={styleInformation.information__two_img}></Box>
          </Box>
          <Box className={styleInformation.three} onClick={() => agroPage()}>
            <Box className={styleInformation.information__three_img}></Box>
          </Box>
          <Box className={styleInformation.four} onClick={() => infoPage()}>
            <Box className={styleInformation.information__four_img}></Box>
          </Box>
          <Box
            className={styleInformation.five}
            onClick={() => agroProfilPage()}
          >
            <Box className={styleInformation.information__five_img}></Box>
          </Box>
          <Box
            className={styleInformation.six}
            onClick={() => stockMarketPage()}
          >
            <Box className={styleInformation.information__six_img}></Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Information;
