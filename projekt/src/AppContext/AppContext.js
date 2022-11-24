import { createContext, useState, useContext } from "react";
import style from "../Components/Header/Header.module.css";
export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const darkMode = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <AppContext.Provider
      value={{ change: handleToggle, visible, set: darkMode, isDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("Not wrapped in app context");
  }
  return ctx;
};
