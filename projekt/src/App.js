import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// lazy lodaing Suspense
import LoginPage from "./Components/pages/LoginPage/LoginPage";
import Analysis from "./Components/pages/Analysis/Analysis";
import Map from "./Components/pages/Map/Map";
import Main from "./Components/pages/Main/Main";
import Planning from "./Components/pages/Planning/Planning";
import Calenda from "./Components/pages/Calendar/Calenda";
import Contact from "./Components/pages/Contact/Contact";
import Information from "./Components/pages/Information/Information";
import Documents from "./Components/pages/Documents/Documents";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/pulpit" element={<Main />} />

            <Route path="/analiza" element={<Analysis />} />

            <Route path="/mapa" element={<Map />} />

            <Route path="/planowanie" element={<Planning />} />

            <Route path="/kalendarz" element={<Calenda />} />

            <Route path="/kontakt" element={<Contact />} />

            <Route path="/informacje" element={<Information />} />

            <Route path="/dokumenty" element={<Documents />} />
            {/* 404 */}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
