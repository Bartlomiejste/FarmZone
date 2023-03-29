import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/pages/LoginPage/LoginPage";
import Analysis from "./Components/pages/Analysis/Analysis";
import Map from "./Components/pages/Map/Weather";
import Main from "./Components/pages/Main/Main";
import Planning from "./Components/pages/Planning/Planning";
import Contact from "./Components/pages/Contact/Contact";
import Information from "./Components/pages/Information/Information";
import Documents from "./Components/pages/Documents/Documents";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { AppContextProvider } from "./AppContext/AppContext";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/pulpit" element={<Main />} />
            <Route path="/analiza" element={<Analysis />} />
            <Route path="/pogoda" element={<Map />} />
            <Route path="/planowanie" element={<Planning />} />
            <Route path="/informacje" element={<Information />} />
            <Route path="/dokumenty" element={<Documents />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
