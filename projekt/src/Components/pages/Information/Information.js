import React from "react";
import styleInformation from "../Information/Information.module.css";
import { Layout } from "../../Layout/Layout";

const Information = () => {
  return (
    <Layout>
      <div className={styleInformation.information__section}>
        <p style={{ textAlign: "center" }}>Wiadomości ze świata</p>
        <div className={styleInformation.information__grid}>
          <div className={styleInformation.green}>
            <p>1</p>
          </div>
          <div className={styleInformation.green}>
            <p>2222</p>2
          </div>
          <div className={styleInformation.green}>3</div>
          <div className={styleInformation.yellow}>4</div>
          <div className={styleInformation.green}>5</div>
          <div className={styleInformation.black}>6</div>
          <div className={styleInformation.green}>7</div>
          <div className={styleInformation.green}>8</div>
          <div className={styleInformation.pink}>9</div>
        </div>
      </div>
    </Layout>
  );
};

export default Information;
