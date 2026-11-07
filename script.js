const selectedCityEl = document.getElementById("selected-city");
const getWeatherBtn = document.getElementById("get-weather-btn");

const weatherContainerEl = document.getElementById("weather-container");
const weatherIconEl = document.getElementById("weather-icon");
const mainTemperatureEl = document.getElementById("main-temperature");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const windGustEl = document.getElementById("wind-gust");
const weatherMainEl = document.getElementById("weather-main");
const locationEl = document.getElementById("location");

getWeatherBtn.addEventListener("click", () => {
  showWeather(selectedCityEl.value);
});

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

async function showWeather(city) {
  const weatherData = await getWeather(city);

  if (weatherData === undefined) {
    alert("Something went wrong, please try again later");
    return;
  }

  weatherContainerEl.classList.remove("hidden");

  const {
    weather,
    main: { temp, feels_like, humidity },
    wind: { speed, gust, deg = 0 },
    name,
  } = weatherData;
  const { main, icon } = weather[0];

  weatherIconEl.src = icon || "";
  mainTemperatureEl.innerHTML = temp ? `<span>${temp.toFixed(0)}&deg;</span>C` : "<span>N/A</span>";
  feelsLikeEl.innerHTML = `${feels_like ? `<span>${feels_like.toFixed(0)}&deg;</span> C` : "<span>N/A</span>"}`;
  humidityEl.innerHTML = `${humidity ? `<span>${humidity}%</span>` : "<span>N/A</span>"}`;
  windEl.innerHTML = `${speed ? `<span>${speed}</span> m/s` : "<span>N/A</span>"}`;
  windGustEl.innerHTML = `${gust ? `<span>${gust}</span> m/s` : "<span>N/A</span>"}`;
  weatherMainEl.innerHTML = `${main}` || "<span>N/A</span>";
  locationEl.innerHTML = `${name}` || "<span>N/A</span>";
}
