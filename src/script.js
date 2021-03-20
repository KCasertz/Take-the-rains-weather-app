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

  let fullDate = `Last updated on ${day}, at ${hours}:${minutes}`;

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

function getTemp(response) {
  let temperatureCurrent = Math.round(response.data.main.temp);
  let tempText = document.querySelector("#temperature-text")
  tempText.innerHTML = `${temperatureCurrent}`
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
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
  
}

function askTempMetric() {
 let cityInput = document.querySelector("#city-input");
 let cityName = cityInput.value;
 let apiKey = "fbf0c8cbaf3d65ed6898c18bd1f3e038";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(getTemp);

}

function askTempImp() {
 let cityInput = document.querySelector("#city-input");
 let cityName = cityInput.value;
 let apiKey = "fbf0c8cbaf3d65ed6898c18bd1f3e038";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
 axios.get(apiUrl).then(getTemp);

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


function getTempCity(response) {
  let temperatureCurrent = Math.round(response.data.main.temp);
  let tempText = document.querySelector("#temperature-text")
  tempText.innerHTML = `${temperatureCurrent}`
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;
  
}
  
function getPosition(position) {
console.log(position);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;  
  
  let apiKey = "fbf0c8cbaf3d65ed6898c18bd1f3e038";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTempCity)
  

}

function handleCurrentClick() {
navigator.geolocation.getCurrentPosition(getPosition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", handleCurrentClick);

