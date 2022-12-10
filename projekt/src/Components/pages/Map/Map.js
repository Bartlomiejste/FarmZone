import React from "react";
import { Layout } from "../../Layout/Layout";
import styleMap from "../Map/Map.module.css";

const Map = () => {
  return (
    <Layout>
      <div className={styleMap.map__section}></div>
    </Layout>
  );
};

export default Map;
