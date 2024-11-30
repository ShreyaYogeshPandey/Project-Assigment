const apiKey = "YOUR_API_KEY"; // Replace with your API key from OpenWeatherMap

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const forecastDisplay = document.getElementById("forecastDisplay");
const recentCities = document.getElementById("recentCities");

// Utility Functions
const fetchWeather = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to fetch weather data.");
    return response.json();
  } catch (error) {
    weatherDisplay.innerHTML = `<p class="text-red-500">${error.message}</p>`;
  }
};

const displayWeather = (data) => {
  const { name, main, weather, wind } = data;
  weatherDisplay.innerHTML = `
    <h2 class="text-2xl font-bold">${name}</h2>
    <p>${weather[0].description}</p>
    <p>Temperature: ${main.temp} °C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;
};

const displayForecast = (data) => {
  forecastDisplay.innerHTML = "";
  data.list.slice(0, 5).forEach((item) => {
    const date = new Date(item.dt * 1000);
    forecastDisplay.innerHTML += `
      <div class="p-4 bg-white rounded shadow text-center">
        <p>${date.toDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}" />
        <p>${item.weather[0].description}</p>
        <p>Temp: ${item.main.temp} °C</p>
        <p>Wind: ${item.wind.speed} m/s</p>
      </div>
    `;
  });
};

const saveRecentCity = (city) => {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("recentCities", JSON.stringify(cities));
    updateRecentCitiesDropdown();
  }
};

const updateRecentCitiesDropdown = () => {
  const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  recentCities.innerHTML = "";
  if (cities.length) {
    recentCities.classList.remove("hidden");
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      recentCities.appendChild(option);
    });
  } else {
    recentCities.classList.add("hidden");
  }
};

// Event Listeners
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherDisplay.innerHTML = `<p class="text-red-500">Please enter a city name.</p>`;
    return;
  }
  const data = await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (data) {
    displayWeather(data);
    saveRecentCity(city);
    const forecastData = await fetchWeather(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    if (forecastData) displayForecast(forecastData);
  }
});

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    const { latitude, longitude } = coords;
    const data = await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    if (data) {
      displayWeather(data);
      const forecastData = await fetchWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      if (forecastData) displayForecast(forecastData);
    }
  });
});

recentCities.addEventListener("change", async () => {
  const city = recentCities.value;
  const data = await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (data) displayWeather(data);
});

// Initialize
updateRecentCitiesDropdown();
