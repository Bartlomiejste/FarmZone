import React from "react";
import styleDocuments from "../Documents/Documents.module.css";
import { Layout } from "../../Layout/Layout";

const Documents = () => {
  return (
    <Layout>
      <div className={styleDocuments.documents__section}>dokumenty</div>
    </Layout>
  );
};

export default Documents;
