function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = cityInput.value;
}

let cityInputValue = document.querySelector("#search-input-form");
cityInputValue.addEventListener("submit", searchInput);

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
let currenttime = new Date();
let currentMonth = months[currenttime.getMonth()];
let currentDay = days[currenttime.getDay()];
let currentDate = `${currenttime.getDate()} ${currentMonth} ${currenttime.getFullYear()}`;
let currentHours = currenttime.getHours();
let currentMinutes = currenttime.getMinutes();

let dateElement = document.querySelector("#date-element");
dateElement.innerHTML = currentDate;

let dayElement = document.querySelector("#day-input");
dayElement.innerHTML = currentDay;

let timeElement = document.querySelector("#time-input");
timeElement.innerHTML = `${currentHours}:${currentMinutes}`;
