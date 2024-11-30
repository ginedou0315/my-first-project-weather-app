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
  let cityElement = document.querySelector("#city-element");
  let city = cityInput.value.trim();
  cityElement.innerHTML = city;
  fetchTemperature(city);
}

let cityInputValue = document.querySelector("#search-input-form");
cityInputValue.addEventListener("submit", searchInput);

function currentTemperature(response) {
  let realTimeTemp = Math.round(response.data.temperature.current);
  let currentTempValue = document.querySelector("#temperature-input");
  currentTempValue.innerHTML = `${realTimeTemp}`;
}

function fetchTemperature(city) {
  let apiKey = "e430a0b40t5635ffab9bc012406aa3ao";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(currentTemperature);
}
