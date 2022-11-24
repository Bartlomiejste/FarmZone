import React from "react";
import styleContact from "../Contact/Contact.module.css";
import { Layout } from "../../Layout/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className={styleContact.contact__section}>Contact</div>
    </Layout>
  );
};

export default Contact;
