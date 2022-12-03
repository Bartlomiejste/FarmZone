import * as React from "react";
import style from "../Header/Header.module.css";
import logo from "../../images/FarmZone.png";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import Switch from "@mui/material/Switch";

const Header = () => {
  const { set } = useContext(AppContext);
  const { isDarkTheme } = useContext(AppContext);

  const pathname = window.location.pathname;

  return (
    <>
      <div className={`${style.header} ${isDarkTheme ? style.dark : null}`}>
        <div className={style.header__name}>
          <p className={style.header__name_title}>
            Gospodarstwo: Gospodarstwo testowe
          </p>
          <p className={style.header__name_navName}>{pathname.split("/")}</p>
        </div>
        <div>
          <img src={logo} alt="logo" className={style.header__img}></img>
        </div>
        <div className={style.header__switch}>
          <Switch
            checked={isDarkTheme}
            onChange={set}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
