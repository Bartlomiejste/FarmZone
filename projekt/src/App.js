import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// tu importy poprawić
// lazy lodaing Suspense
import LoginPage from "./Components/pages/LoginPage/LoginPage";
import Analysis from "./Components/pages/Analysis/Analysis";
import Map from "./Components/pages/Map/Map";
import Main from "./Components/pages/Main/Main";
import Planning from "./Components/pages/Planning/Planning";
import Calendar from "./Components/pages/Calendar/Calendar";
import Contact from "./Components/pages/Contact/Contact";
import Information from "./Components/pages/Information/Information";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/main" element={<Main />} />

            <Route path="/analysis" element={<Analysis />} />

            <Route path="/map" element={<Map />} />

            <Route path="/planning" element={<Planning />} />

            <Route path="/calendar" element={<Calendar />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/information" element={<Information />} />
            {/* 404 */}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
