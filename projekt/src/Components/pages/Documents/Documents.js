import React, { useState, useEffect } from "react";
import styleDocuments from "../Documents/Documents.module.css";
import { Layout } from "../../Layout/Layout";
import { supabase } from "../../../supabase/config";
import TableFiles from "../../pages/Documents/TableFiles";
const Documents = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("images")
      .upload(file?.name, file);
    if (data) {
      console.log(data);
    } else if (error);
    console.log(error);
  };

  useEffect(() => {
    handleDownload();
  }, []);

  const handleDownload = async () => {
    const { data, error } = await supabase.storage.from("images").download(); //dodaje jednego a chce wszystkie
    if (data) {
      setFiles(data);
    } else if (error) console.log(error);
  };
  console.log(files);

  return (
    <Layout>
      <div className={styleDocuments.documents__section}>
        <form className={styleDocuments.documents__form}>
          <label htmlFor="file" className={styleDocuments.documents__title}>
            Załącz dokument:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
          <button>Dodaj dokument</button>
        </form>

        {/* {Array.isArray(files)
                ? files.map((type) => {
                    <td>{type.type}</td>;
                  })
                : null} */}

        <TableFiles />
      </div>
    </Layout>
  );
};

export default Documents;
