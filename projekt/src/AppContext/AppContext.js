import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../../../projekt/src/supabase/config";

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [errorForm, setErrorForm] = useState(null);

  useEffect(() => {
    getUserLogin();
  }, []);

  const getUserLogin = () => {
    let { data: User, error } = supabase.from("User").select("*");
    if (error) {
      setErrorForm("Błąd");
      console.log(error);
    }
    if (User) {
      setIsUserLogged(User);
      setErrorForm(null);
    }
  };

  const handleToggle = () => {
    setVisible(!visible);
  };

  const darkMode = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const login = () => {
    setIsUserLogged(!isUserLogged);
  };

  const logout = () => {
    setIsUserLogged(isUserLogged);
  };

  return (
    <AppContext.Provider
      value={{
        change: handleToggle,
        visible,
        set: darkMode,
        isDarkTheme,

        toLogin: login,
        isUserLogged,

        toLogout: logout,
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
