import pubSub from './pubsub';

const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const cityContainer = document.querySelector('.city-container');
const cityError = document.querySelector('.city-input-error');

function searchCity(city) {
  pubSub.publish('search city', city);
}

function cleanCityFormInput() {
  cityInput.value = '';
}

function cityInputValidator() {
  if (cityInput.validity.valueMissing) {
    cityError.textContent = 'please enter a city name';
  }
  if (cityInput.validity.valid) {
    cityError.textContent = '';
  }
}

cityInput.addEventListener('focusout', cityInputValidator);

form.addEventListener('submit', (e) => {
  if (cityInput.validity.valid) {
    searchCity(cityInput.value);
    cleanCityFormInput();
    e.preventDefault();
  } else {
    cityInputValidator();
    e.preventDefault();
  }
});

function cleanCityContainer() {
  cityContainer.innerHTML = '';
}

function displayCityData(city) {
  const container = document.createElement('div');
  const cityName = document.createElement('div');
  const name = document.createElement('h2');
  const country = document.createElement('div');
  const temp = document.createElement('div');
  const humidity = document.createElement('div');
  const weatherDescription = document.createElement('div');

  container.classList.add('city');
  cityName.classList.add('city-name');
  temp.classList.add('city-temp');

  name.textContent = city.name;
  country.textContent = city.country;
  temp.textContent = `${city.temp} °C`;
  humidity.textContent = `Humidity: ${city.humidity} %`;
  weatherDescription.textContent = city.weather_description;

  cityContainer.appendChild(container);
  container.appendChild(cityName);
  cityName.appendChild(name);
  cityName.appendChild(country);
  container.appendChild(temp);
  container.appendChild(humidity);
  container.appendChild(weatherDescription);
}

pubSub.subscribe('city found', cleanCityContainer);
pubSub.subscribe('city found', displayCityData);

function errorCityNotFound() {
  cityError.textContent = 'city not found, check typo errors';
}

pubSub.subscribe('city not found', errorCityNotFound);
