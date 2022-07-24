import pubSub from './pubsub';

function importantCityData(city) {
  const obj = {
    name: city.name,
    country: city.sys.country,
    temp: Math.round(city.main.temp),
    humidity: city.main.humidity,
    weather_description: city.weather[0].description,
  };
  return obj;
}

async function fetchApi(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8932cda987fbe6ffc7bc17f39a224ad2&units=metric`,
      {
        mode: 'cors',
      }
    );

    const cityResponse = await response.json();
    pubSub.publish('city found', importantCityData(cityResponse));
  } catch (error) {
    pubSub.publish('city not found');
  }
}

fetchApi('london');

pubSub.subscribe('search city', fetchApi);
