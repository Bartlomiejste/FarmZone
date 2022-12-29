import React, { useState } from "react";
import style from "../SideNavBar/SideNavBar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import { Suspense } from "react";
import { DelayedFallback } from "../../ErrorBoundary/DelayedFallback";

import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Avatar from "@mui/material/Avatar";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FolderIcon from "@mui/icons-material/Folder";

export const SideNavBar = () => {
  const [menuItems, setMenuItems] = useState([
    {
      text: "Pulpit",
      icon: <HomeIcon />,
      path: "/pulpit",
    },
    {
      text: "Analiza zysków i strat",
      icon: <BarChartIcon />,
      path: "/analiza",
    },
    {
      text: "Pogoda",
      icon: <ThermostatIcon />,
      path: "/pogoda",
    },
    {
      text: "Planowanie",
      icon: <WorkHistoryIcon />,
      path: "/planowanie",
    },
    {
      text: "Najnowsze informacje",
      icon: <ImportContactsIcon />,
      path: "/informacje",
    },
    {
      text: "Dokumenty",
      icon: <FolderIcon />,
      path: "/dokumenty",
    },
    {
      text: "Kontakt i pomoc",
      icon: <ContactMailIcon />,
      path: "/kontakt",
    },
  ]);
  const { visible } = useContext(AppContext);
  const { change } = useContext(AppContext);
  const { isDarkTheme } = useContext(AppContext);

  const { logout } = useContext(AppContext);

  return (
    <Suspense
      fallback={
        <p>
          <DelayedFallback />
        </p>
      }
    >
      <div
        className={`${style.container} ${
          visible ? style.container : style.container_min
        } `}
      >
        <div
          className={`${style.menu__arrow} ${
            visible ? style.menu__arrow : style.menu__arrow_min
          }`}
          onClick={change}
        >
          {visible ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </div>
        <div
          className={`${style.menu__avatar} ${
            visible ? style.menu__avatar : null
          }`}
        >
          <Avatar src="/broken-image.jpg" className={style.avatarimg} />
          {visible ? <p className={style.nameuser}>Admin</p> : null}
        </div>
        <div
          className={`${style.menu__logout} ${
            visible ? style.menu__logout : style.menu__logout_min
          }`}
          onClick={logout}
        >
          <LogoutIcon />
          {visible ? <p className={style.logutname}>Wyloguj</p> : null}
        </div>

        <div
          className={`${style.menu__navigation} ${
            isDarkTheme ? style.dark : null
          }`}
        >
          {menuItems.map(({ text, icon, path }) => (
            <Link
              key={text}
              className={`${style.menu__navigation_link} ${
                visible
                  ? style.menu__navigation_link
                  : style.menu__navigation_link_min
              } ${isDarkTheme ? style.dark : null}`}
              to={path}
            >
              <MenuItem style={{ background: "transparent" }}>
                <div className={style.menu__navigation_icon}>{icon}</div>
                <div className={style.textMenuItem}>
                  {visible ? text : null}
                </div>
              </MenuItem>
            </Link>
          ))}
        </div>
        <div
          className={`${style.menu__navigation_footer} ${
            visible
              ? style.menu__navigation_footer
              : style.menu__navigation_footer_min
          }`}
        >
          <p>@Copyright 2022</p>
        </div>
      </div>
    </Suspense>
  );
};

export default SideNavBar;
