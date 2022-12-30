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
        <div className={styleWeather.weather__description}>
          <b>Pogoda</b> to kluczowy element wpływający na termin pojawienia się
          oraz rozwój populacji szkodników na polach uprawnych, ale i na ich
          szkodliwość. Jakie gatunki się pojawią i w jakim nasileniu, to jednak
          sprawa odmienna, często związana z lokalnymi warunkami
          glebowo-klimatycznymi, systemem uprawy kukurydzy, wysianą odmianą,
          stosowanymi metodami profilaktycznymi, obecnością innych upraw w
          otoczeniu, w tym dzikiej roślinności.
          <p>
            Nie trzeba być specjalistą od meteorologii, aby móc obserwować wpływ
            pogody na przyrodę, w tym na rośliny, jakie człowiek uprawia.
            Temperatura, wilgotność oraz szereg innych parametrów, choćby wiatr,
            nasłonecznienie, promieniowanie UV itd. oddziałują nie tylko na
            gatunek uprawny, lecz także na organizmy, jakie w nim się pojawiają.
            Mało tego, wpływają także na zabiegi pielęgnacyjne wykonywane przez
            rolników i ogrodników, choćby na ochronę roślin i jej skuteczność,
            co później także ma swoje konsekwencje w sytuacji fitosanitarnej na
            polu. W tych aspektach często ocenia się wpływ pogody na sytuację
            występującą na polu...,
            <strong>
              więc warto spojrzeć na prognozę pogody zanim wyruszmy w drogę na
              pola:
            </strong>
          </p>
        </div>

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
                <div className={styleWeather.city__temp_title}>
                  Pogoda na dziś
                </div>
                {Math.round(weather.main.temp)}
                <sup className={styleWeather.temperature}>&deg;C</sup>
              </div>
              <div className={styleWeather.info}>
                <img
                  className={styleWeather.city__icon}
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].desccription}
                ></img>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
