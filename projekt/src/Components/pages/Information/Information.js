import React, { useEffect } from "react";
import styleInformation from "../Information/Information.module.css";
import { Layout } from "../../Layout/Layout";

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
      <div className={styleInformation.information__section}>
        <p className={styleInformation.information__title}>
          Najnowsze Informacje
        </p>
        <div className={styleInformation.information__grid}>
          <div className={styleInformation.one} onClick={() => farmerPage()}>
            <div className={styleInformation.information__one_img}></div>
          </div>
          <div className={styleInformation.two} onClick={() => farmPage()}>
            <div className={styleInformation.information__two_img}></div>
          </div>
          <div className={styleInformation.three} onClick={() => agroPage()}>
            <div className={styleInformation.information__three_img}></div>
          </div>
          <div className={styleInformation.four} onClick={() => infoPage()}>
            <div className={styleInformation.information__four_img}></div>
          </div>
          <div
            className={styleInformation.five}
            onClick={() => agroProfilPage()}
          >
            <div className={styleInformation.information__five_img}></div>
          </div>
          <div
            className={styleInformation.six}
            onClick={() => stockMarketPage()}
          >
            <div className={styleInformation.information__six_img}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Information;
