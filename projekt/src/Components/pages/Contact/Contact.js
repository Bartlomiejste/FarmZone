import React, { useState } from "react";
import styleContact from "../Contact/Contact.module.css";
import { Layout } from "../../Layout/Layout";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { supabase } from "../../../supabase/config";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "./ContactValidation";

export function FormField({ name, errors, touched, value }) {
  return (
    <div>
      <label>{name} </label>
      <Field name={name} value={value} />
      {errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
    </div>
  );
}

const Contact = () => {
  const [contacts, setContacts] = useState("");

  const { isDarkTheme } = useContext(AppContext);

  const linkedinUrl = "https://www.linkedin.com/in/stepien-bartlomiej";

  const gitHubUrl = "https://github.com/Bartlomiejste/FarmZone";

  const downloadCV = () => {
    fetch("CV.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "CV.pdf";
        alink.click();
      });
    });
  };

  const initialValues = {
    Name: "",
    Email: "",
    Message: "",
  };
  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Email: "",
          Message: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          const { data: Contact, error } = await supabase
            .from("Contact")
            .insert([
              {
                Name: values.Name,
                Email: values.Email,
                Message: values.Message,
              },
            ]);

          if (error) {
            throw error;
          }
          console.log(error);

          if (Contact) {
            setContacts(Contact);
          }
          resetForm(initialValues);
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <Layout>
            <div className={styleContact.contact__section}>
              <Form className={styleContact.form} onSubmit={handleSubmit}>
                <h1 className={styleContact.form__title}>
                  Skontaktuj się z nami
                </h1>
                <Field name={"Name"}>
                  {({ field, meta }) => (
                    <div className={styleContact.form__settings}>
                      <label
                        htmlFor="Name"
                        className={styleContact.form__label}
                      >
                        Imię
                      </label>
                      <input
                        className={`${styleContact.form__name} ${
                          isDarkTheme ? styleContact.dark : null
                        }`}
                        placeholder="Imię"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        {...field}
                        value={values.Name}
                      />
                      {meta.touched && meta.error && (
                        <div className={styleContact.error}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>

                <Field name={"Email"}>
                  {({ field, meta }) => (
                    <div className={styleContact.form__settings}>
                      <label
                        htmlFor="Email"
                        className={styleContact.form__label}
                      >
                        Email
                      </label>
                      <input
                        className={`${styleContact.form__email} ${
                          isDarkTheme ? styleContact.dark : null
                        }`}
                        placeholder="Email"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        {...field}
                        value={values.Email}
                      />
                      {meta.touched && meta.error && (
                        <div className={styleContact.error}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>

                <Field name={"Message"}>
                  {({ field, meta }) => (
                    <div>
                      <label
                        htmlFor="Message"
                        className={styleContact.form__label}
                      >
                        Wiadomość
                      </label>
                      <textarea
                        className={`${styleContact.form__message} ${
                          isDarkTheme ? styleContact.dark : null
                        }`}
                        placeholder="Wiadomość"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        {...field}
                        value={values.Message}
                      ></textarea>
                      {meta.touched && meta.error && (
                        <div className={styleContact.error}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>

                <button
                  className={`${styleContact.form__button} ${
                    isDarkTheme ? styleContact.dark : null
                  }`}
                  type="submit"
                >
                  Wyślij
                </button>

                <div className={styleContact.iconContact}>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styleContact.linkedin}
                  >
                    <LinkedInIcon
                      style={{
                        fontSize: "60px",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon
                      style={{
                        fontSize: "60px",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    />
                  </a>

                  <PictureAsPdfIcon
                    style={{ fontSize: "60px", cursor: "pointer" }}
                    onClick={downloadCV}
                  />
                </div>
              </Form>
            </div>
          </Layout>
        )}
      </Formik>
    </>
  );
};

export default Contact;
