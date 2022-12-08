import React, { useState, useRef } from "react";
import styleDocuments from "../Documents/Documents.module.css";
import { Layout } from "../../Layout/Layout";

const Documents = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <Layout>
      <div className={styleDocuments.documents__section}>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="file"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Documents;
