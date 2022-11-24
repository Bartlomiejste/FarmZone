import React from "react";
import style from "../pages/Main/Main.module.css";
import { AppContext } from "../../AppContext/AppContext";
import { useContext } from "react";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";

export const Layout = ({ children }) => {
  const { visible } = useContext(AppContext);
  // z konteksut isLogged children : /login
  return (
    <div className={`${style.main} ${visible ? style.main : style.main_min}`}>
      <Header />
      <SideNavBar />
      {children}
    </div>
  );
};
