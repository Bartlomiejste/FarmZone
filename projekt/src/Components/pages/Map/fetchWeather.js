import axios from "axios";
const url = "https://api.openweathermap.org/data/2.5/weather";
const key = "4274419433a80ab29d30ac92a367a289";

async function fetchWeather(query) {
  const { data } = await axios.get(url, {
    params: {
      q: query,
      units: "metric",
      APPID: key,
    },
  });
  return data;
}

export default fetchWeather;
