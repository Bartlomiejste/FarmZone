import { createContext, useState, useContext } from "react";

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const darkMode = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const login = () => {
    setIsUserLogged(true);
  };

  return (
    <AppContext.Provider
      value={{
        change: handleToggle,
        visible,
        set: darkMode,
        isDarkTheme,
        user: login,
        isUserLogged,
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
