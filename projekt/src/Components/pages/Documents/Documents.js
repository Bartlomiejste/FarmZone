import React, { useState, useEffect } from "react";
import styleDocuments from "../Documents/Documents.module.css";
import { Layout } from "../../Layout/Layout";
import { supabase } from "../../../supabase/config";
import TableFiles from "../../pages/Documents/TableFiles";

const Documents = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(file.name, file);
      if (data) {
        const { data: imageLink, error: imageLinkError } =
          await supabase.storage.from("images").getPublicUrl(data.path);
        const { data: insertData, error: errorTable } = await supabase
          .from("files")
          .insert([
            {
              NazwaPliku: file.name,
              DataUtworzenia: new Date().toISOString(),
              TypPliku: file.type,
              RozmiarPliku: file.size,
              Url: imageLink.publicUrl,
            },
          ]);
        console.log(insertData, errorTable);
      } else if (error);
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <Layout>
      <div className={styleDocuments.documents__section}>
        <form
          className={styleDocuments.documents__form}
          onSubmit={handleUpload}
        >
          <label htmlFor="file" className={styleDocuments.documents__title}>
            Załącz dokument:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className={styleDocuments.documents__selectFile}
            required
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
