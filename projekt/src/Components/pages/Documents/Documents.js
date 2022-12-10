import React, { useState, useRef, useEffect } from "react";
import styleDocuments from "../Documents/Documents.module.css";
import { Layout } from "../../Layout/Layout";
import { supabase } from "../../../supabase/config";
import Table from "react-bootstrap/Table";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Documents = () => {
  const [all, setAll] = useState([]);
  const [files, setFiles] = useState([]);
  const handleUpload = async (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage
      .from("images/File")
      .upload(file?.name, file);

    if (data) {
      console.log(data);
    } else if (error) console.log(error);
  };

  useEffect(() => {
    handleDownload();
    alls();
  }, []);

  const handleDownload = async () => {
    const { data, error } = await supabase.storage
      .from("images/File")
      .download("farmerPage.png");
    if (data) {
      setFiles(data);
    } else if (error) console.log(error);
  };
  console.log(files);

  const alls = async () => {
    const { res, error } = await supabase.storage.from("images").list();
    if (res) {
      setAll(res);
    } else if (error) console.log(error);
  };

  console.log(all);

  return (
    <Layout>
      <div className={styleDocuments.documents__section}>
        <form className={styleDocuments.documents__form}>
          <label htmlFor="file" className={styleDocuments.documents__title}>
            Dodaj dokument:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
        </form>

        <table className={styleDocuments.documents__table}>
          <thead className={styleDocuments.documents__thead}>
            <tr>
              <th>Lp.</th>
              <th>Nazwa pliku</th>
              <th>Data utworzenia</th>
              <th>Typ pliku</th>
              <th>Rozmiar pliku</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* {Array.isArray(files)
                ? files.map((type) => {
                    <td>{type.type}</td>;
                  })
                : null} */}
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Documents;
