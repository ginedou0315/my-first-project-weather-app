let currentDate = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentMonth = months[currentDate.getMonth()];
let currentYear = currentDate.getFullYear();
let dateValue = currentDate.getDate();
let currentDateValue = `${dateValue} ${currentMonth} ${currentYear}`;

let dateElement = document.querySelector("#date-element");
dateElement.innerHTML = currentDateValue;

let currentDay = days[currentDate.getDay()];
let dayElement = document.querySelector("#day-input");
dayElement.innerHTML = currentDay;

function timeElement(time) {
  let currentHours = time.getHours();
  let currentMinutes = time.getMinutes();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHours}:${currentMinutes}`;
}

let timeValue = document.querySelector("#time-input");
timeValue.innerHTML = timeElement(currentDate);

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let cityInputValue = document.querySelector("#search-input-form");
cityInputValue.addEventListener("submit", searchInput);

function searchCity(city) {
  let apiKey = "e430a0b40t5635ffab9bc012406aa3ao";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(currentConditions);
}
searchCity("Prague");
//function sunriseSunset(LATITUDE, LONGITUDE) {
//let sunApiURL = `https://api.sunrise-sunset.org/json?lat={LATITUDE}&lng={LONGITUDE}&formatted=0`;
//axios.get(sunApiURL).then(sunriseSunsetCondition);
//}

//function sunriseSunsetCondition(response) {
//let sunriseElement = document.querySelector("#sunrise");
//let realTimeSunrise = response.results.sunrise;
//sunriseElement.innerHTML = `${realTimeSunrise}`;
//}

function currentConditions(response) {
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.city;

  let realTimeTemp = Math.round(response.data.temperature.current);
  let currentTempValue = document.querySelector("#temperature-input");
  currentTempValue.innerHTML = `${realTimeTemp}`;

  let realTimeIcon = response.data.condition.icon;
  let iconConditionEmoji = document.querySelector("#icon-condition");
  iconConditionEmoji.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  let realTimeTextCondition = response.data.condition.description;
  let textCondition = document.querySelector("#text-condition");
  textCondition.innerHTML = `${realTimeTextCondition}`;

  let realFeelsLikeTemp = Math.round(response.data.temperature.feels_like);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = `${realFeelsLikeTemp}°C`;

  let realTimeHumidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = `${realTimeHumidity}%`;

  let realTimeWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = `${realTimeWind} m/s`;

  let windDegree = response.data.wind.degree;
  let windDirection = getWindDirection(windDegree);
  let windDirectionElement = document.querySelector("#wind-direction");
  if (windDirectionElement) windDirectionElement.innerHTML = `${windDirection}`;
}
function getWindDirection(degree) {
  let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  let index = Math.round(degree / 45) % 8;
  return directions[index];
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastsHtml = "";

  days.forEach(function (day) {
    forecastsHtml += `
      <div class="day-forecast">
        <div class="date-forecast">${day}</div>
        <div class="icon-forecast">🌤️</div>
        <div class="temperature-forecasts">
          <div class="temp-forecast">
            <strong>18°</strong>
          </div>
          <div class="temp-forecast">10°</div>
        </div>
      </div>
    `;
  });

  let forecastsElement = document.querySelector("#forecast");
  if (forecastsElement) {
    forecastsElement.innerHTML = forecastsHtml;
  } else {
    console.error("Forecast element not found in the DOM.");
  }
}

displayForecast();
