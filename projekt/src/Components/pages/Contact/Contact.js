import React from "react";
import styleContact from "../Contact/Contact.module.css";
import { Layout } from "../../Layout/Layout";
import DelayedFallback from "../../../ErrorBoundary/DelayedFallback";
const Contact = () => {
  return (
    <Layout>
      <div className={styleContact.contact__section}>Contact</div>
    </Layout>
  );
};

export default Contact;
