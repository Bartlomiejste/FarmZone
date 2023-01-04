const url = "https://api.openweathermap.org/data/2.5/weather";
const key = "4274419433a80ab29d30ac92a367a289";

async function fetchWeather(query) {
  const response = await fetch(`${url}?q=${query}&units=metric&APPID=${key}`);
  const data = await response.json();
  return data;
}

export default fetchWeather;
