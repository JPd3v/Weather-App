import pubSub from './pubsub';

const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const cityContainer = document.querySelector('.city-container');
function searchCity(city) {
  pubSub.publish('search city', city);
}

function cleanCityFormInput() {
  cityInput.value = '';
}

form.addEventListener('submit', (e) => {
  searchCity(cityInput.value);
  cleanCityFormInput();
  e.preventDefault();
});

function cleanCityContainer() {
  cityContainer.innerHTML = '';
}

function displayCityData(city) {
  const name = document.createElement('div');
  const country = document.createElement('div');
  const temp = document.createElement('div');
  const humidity = document.createElement('div');

  const weatherDescription = document.createElement('div');

  name.textContent = city.name;
  country.textContent = city.country;

  temp.textContent = `${city.temp} °C`;
  humidity.textContent = `Humidity: ${city.humidity} %`;
  weatherDescription.textContent = city.weather_description;

  cityContainer.appendChild(name);
  cityContainer.appendChild(country);
  cityContainer.appendChild(temp);
  cityContainer.appendChild(humidity);
  cityContainer.appendChild(weatherDescription);
}

pubSub.subscribe('city found', cleanCityContainer);
pubSub.subscribe('city found', displayCityData);
