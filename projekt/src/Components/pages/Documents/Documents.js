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
    const { data, error } = await supabase.storage.from("images").download();
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
            className={styleDocuments.documents__selectFile}
          />
          <button className={styleDocuments.documents__btn}>
            Dodaj dokument
          </button>
        </form>
        <TableFiles />
      </div>
    </Layout>
  );
};

export default Documents;
