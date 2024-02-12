const axios = require("axios");

async function getWeather(location) {
  try {
    const city = location.split(",")[0].trim(); // dodane aby ignorować dopiski po przeicnku, występował błąd, gdy pobierałem lokalizację San Francisco, CA
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=${city}`
    );
    return response.data.weather[0];
  } catch (error) {
    throw new Error(
      `Nie udało się pobrać pogody dla lokalizacji: ${location}, ${error.message}`
    );
  }
}

module.exports = getWeather;
