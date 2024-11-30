function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = cityInput.value;
}

let cityInputValue = document.querySelector("#search-input-form");
cityInputValue.addEventListener("submit", searchInput);

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
