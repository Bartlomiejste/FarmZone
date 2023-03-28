import * as React from "react";
import style from "../Header/Header.module.css";
import logo from "../../images/FarmZone.png";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import Switch from "@mui/material/Switch";
import Clock from "./Clock/Clock";
import { Box, Typography } from "@mui/material";

const Header = () => {
  const { set } = useContext(AppContext);
  const { isDarkTheme } = useContext(AppContext);

  const pathname = window.location.pathname;

  return (
    <Box className={`${style.header} ${isDarkTheme ? style.dark : null}`}>
      <Box className={style.header__name}>
        <Typography variant="p" className={style.header__name_title}>
          Gospodarstwo: Gospodarstwo testowe
        </Typography>
        <Typography
          sx={{
            fontSize: "25px",
            marginTop: "5px",
            fontFamily: "'Quicksand', sans-serif",
          }}
          className={style.header__name_name}
        >
          {pathname.split("/")}
        </Typography>
      </Box>
      <Box>
        <img src={logo} alt="logo" className={style.header__img}></img>
      </Box>
      <Box>
        <Clock />
        <Switch
          checked={isDarkTheme}
          onChange={set}
          inputProps={{ "aria-label": "controlled" }}
          className={style.header__switch}
        />
      </Box>
    </Box>
  );
};

export default Header;
