import React from "react";
import styleInformation from "../Information/Information.module.css";
import { Layout } from "../../Layout/Layout";

const Information = () => {
  return (
    <Layout>
      <div className={styleInformation.information__section}>Information</div>
    </Layout>
  );
};

export default Information;
