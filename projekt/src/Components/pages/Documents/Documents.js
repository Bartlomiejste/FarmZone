import React, { useState, useRef, useEffect } from "react";
import styleDocuments from "../Documents/Documents.module.css";
import { Layout } from "../../Layout/Layout";
import { supabase } from "../../../supabase/config";

const Documents = () => {
  const [files, setFiles] = useState([]);
  const handleUpload = async (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(file?.name, file);

    if (data) {
      console.log(data);
    } else if (error) console.log(error);
  };

  useEffect(() => {
    handleDownload();
  }, []);

  const handleDownload = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .download("/farmerPage.png");
    if (data) {
      setFiles(data);
    } else if (error) console.log(error);
  };
  console.log(files);

  return (
    <Layout>
      <div className={styleDocuments.documents__section}>
        <form>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
        </form>
        <button>Odśwież</button>

        {Array.isArray(files)
          ? files.map((type) => {
              <p key={type}>{type.type}</p>;
            })
          : null}
      </div>
    </Layout>
  );
};

export default Documents;
// setSelectedFile(event.target.files[0]);
