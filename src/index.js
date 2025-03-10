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
  windElement.innerHTML = `${realTimeWind} km/h`;

  let windDegree = response.data.wind.degree;
  let windDirection = getWindDirection(windDegree);
  let windDirectionElement = document.querySelector("#wind-direction");
  if (windDirectionElement) windDirectionElement.innerHTML = `${windDirection}`;

  getForecast(response.data.city);
}
function getWindDirection(degree) {
  let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  let index = Math.round(degree / 45) % 8;
  return directions[index];
}
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
  axios.get(apiURL).then((response) => {
    currentConditions(response);
    const latitude = response.data.coordinates.latitude;
    const longitude = response.data.coordinates.longitude;
    sunriseSunset(latitude, longitude, city);
  });
}
searchCity("Prague");

function sunriseSunset(LATITUDE, LONGITUDE, city) {
  let apiURL = `https://api.sunrise-sunset.org/json?lat=${LATITUDE}&lng=${LONGITUDE}`;
  axios.get(apiURL).then((response) => sunriseSunsetCondition(response, city));
}

function sunriseSunsetCondition(response, city) {
  let sunriseRealTime = response.data.results.sunrise;
  let sunsetRealTime = response.data.results.sunset;
  const cityTimezones = {
    Tokyo: "Asia/Tokyo",
    "New York": "America/New_York",
    London: "Europe/London",
    Berlin: "Europe/Berlin",
    Prague: "Europe/Berlin",
    Manila: "Asia/Tokyo",
    Bangkok: "Asia/Tokyo",
    "Kuala Lumpur": "Asia/Tokyo",
  };
  let timezone = cityTimezones[city];
  if (timezone) {
    let localTimeZoneSunrise = moment
      .tz(sunriseRealTime, "h:mm:ss A", "UTC")
      .tz(timezone)
      .format("h:mm A");
    let localTimeZoneSunset = moment
      .tz(sunsetRealTime, "h:mm:ss A", "UTC")
      .tz(timezone)
      .format("h:mm A");
    console.log("Local Timezone Sunrise:", localTimeZoneSunrise);
    console.log("Local Timezone Sunset:", localTimeZoneSunset);
    let sunriseElement = document.querySelector("#sunrise");
    let sunsetElement = document.querySelector("#sunset");
    if (sunriseElement && sunsetElement) {
      sunriseElement.innerHTML = localTimeZoneSunrise;
      sunsetElement.innerHTML = localTimeZoneSunset;
    }
  } else {
    console.error("Timezone for the city not found.");
  }
}
sunriseSunsetCondition();

function getForecast(city) {
  let apiKey = "e430a0b40t5635ffab9bc012406aa3ao";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  console.log(response.data);

  let forecastsHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastsHtml += `
      <div class="day-forecast">
        <div class="date-forecast">${formatDay(day.time)}</div>
        <div class="icon-forecast"> <img src="${
          day.condition.icon_url
        }"/> </div>
        <div class="temperature-forecasts">
          <div class="temp-forecast">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="temp-forecast" id="minimum-temp">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>
    `;
    }
  });

  let forecastsElement = document.querySelector("#forecast");
  if (forecastsElement) {
    forecastsElement.innerHTML = forecastsHtml;
  }
}

displayForecast();

getSunTimes("Tokyo");
