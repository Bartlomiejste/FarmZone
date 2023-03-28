import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(() => {
    return JSON.parse(localStorage.getItem("userLogged"));
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setVisible(!visible);
  };

  const darkMode = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const login = () => {
    setIsUserLogged(true);
    localStorage.setItem("userLogged", true);
  };

  const logout = () => {
    setIsUserLogged(false);
    localStorage.setItem("userLogged", false);
    navigate("/");
  };

  return (
    <AppContext.Provider
      value={{
        change: handleToggle,
        visible,
        set: darkMode,
        isDarkTheme,
        login,
        isUserLogged,
        logout,
      }}
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
