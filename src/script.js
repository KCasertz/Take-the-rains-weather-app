function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[now.getDay()];

  let fullDate = `${day}, at ${hours}:${minutes}`;

  return fullDate;
}

let formattedDate = formatDate(new Date());

let datePlaceholder = document.querySelector("#date-text");
datePlaceholder.innerHTML = `${formattedDate}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${cityInput.value}`;
}

function getWindfromMps(response) {
  let windText = document.querySelector("#wind-speed")
  windText.innerHTML = Math.round(response.data.wind.speed * 2.237);
}

function getWindfromMph(response) {
  let windText = document.querySelector("#wind-speed")
  windText.innerHTML = Math.round(response.data.wind.speed);
}

function getTemp(response) {
  
  let temperatureCurrent = Math.round(response.data.main.temp);
  let tempText = document.querySelector("#temperature-text")
  tempText.innerHTML = `${temperatureCurrent}`
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let mainWeatherIcon = document.querySelector("#main-weather-icon");
  mainWeatherIcon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);

  let weatherDescriptionText = document.querySelector("#weather-description-text")
  weatherDescriptionText.innerHTML = response.data.weather[0].main;

  if (response.data.weather[0].main === "Thunderstorm") {
    weatherDescriptionText.innerHTML = "thunderstorms"
  }
  if (response.data.weather[0].main === "Clear") {
    weatherDescriptionText.innerHTML = "it's pretty clear"
  }
  if (response.data.weather[0].main === "Clouds") {
    weatherDescriptionText.innerHTML = "it's pretty cloudy"
  }
  if (response.data.weather[0].main === "Tornado") {
    weatherDescriptionText.innerHTML = "a tornado's coming"
  }

  

  
  let humidityText = document.querySelector("#humidity")
  humidityText.innerHTML = response.data.main.humidity;

 }

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;}
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;}
  
  return `${hours}:${minutes}`;

}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
      <p class="forecast-text">
        <b>${formatHours(forecast.dt * 1000)}</b></br>
      <img class="forecast-img" src="images/${forecast.weather[0].icon}.png">
        <b>${Math.round(forecast.main.temp_max)}° </b>${Math.round(forecast.main.temp_min)}°</p>
    </div>
` }
  }
  
function askTempMetric() {
 let cityInput = document.querySelector("#city-input");
 let cityName = cityInput.value;
 let apiKey = "fbf0c8cbaf3d65ed6898c18bd1f3e038";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(getTemp);
 axios.get(apiUrl).then(getWindfromMps);

 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast)

}


function askTempImp() {
 let cityInput = document.querySelector("#city-input");
 let cityName = cityInput.value;
 let apiKey = "fbf0c8cbaf3d65ed6898c18bd1f3e038";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
 axios.get(apiUrl).then(getTemp);
 axios.get(apiUrl).then(getWindfromMph);

 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
 axios.get(apiUrl).then(displayForecast)
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", showCity);
citySearchForm.addEventListener("submit", askTempMetric);


let celsiusLink = document.querySelector("#celsius-link");
let farenheitLink = document.querySelector("#farenheit-link");
let tempText = document.querySelector("#temperature-text");

function switchToCelsius(event) {
  event.preventDefault();
  askTempMetric();
}

function switchToFarenheit(event) {
  event.preventDefault();
  askTempImp();
}

celsiusLink.addEventListener("click", switchToCelsius);
farenheitLink.addEventListener("click", switchToFarenheit);



  
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;  
  
  let apiKey = "fbf0c8cbaf3d65ed6898c18bd1f3e038";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp)

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast)  

}

function handleCurrentClick() {
navigator.geolocation.getCurrentPosition(getPosition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", handleCurrentClick);