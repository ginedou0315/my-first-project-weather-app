function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = cityInput.value;
}

let cityInputValue = document.querySelector("#search-input-form");
cityInputValue.addEventListener("submit", searchInput);
