import React, { useState } from "react";
import fetchWeather from "./fetchWeather";
import styleWeather from "../Map/Weather.module.css";
import { Layout } from "../../Layout/Layout";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <Layout>
      <div className={styleWeather.map__section}>
        <div className={styleWeather.main__container}>
          <input
            type="text"
            className={styleWeather.search}
            placeholder="Wpisz swoją lokalizację"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          ></input>
          {weather.main && (
            <div className={styleWeather.city}>
              <h2 className={styleWeather.city__name}>
                <span>{weather.name}</span>
                <sup className={styleWeather.country}>
                  {weather.sys.country}
                </sup>
              </h2>
              <div className={styleWeather.city__temp}>
                {Math.round(weather.main.temp)}
                <sup className={styleWeather.temperature}>&deg;C</sup>
              </div>
              <div className={styleWeather.info}>
                <img
                  className={styleWeather.city__icon}
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].desccription}
                ></img>
                {/* <p className={styleWeather.weatherDescription}>
                  {weather.weather[0].description}
                </p> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
