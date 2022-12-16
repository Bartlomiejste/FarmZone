import React, { useEffect } from "react";
import style from "../pages/Main/Main.module.css";
import { AppContext } from "../../AppContext/AppContext";
import { useContext } from "react";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const { visible } = useContext(AppContext);
  const { isUserLogged } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className={`${style.main} ${visible ? style.main : style.main_min}`}>
        <Header />
        <SideNavBar />
        {children}
      </div>
    </>
  );
};
