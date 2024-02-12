const fs = require("fs");
const axios = require("axios");

// Pobieranie danych z API asynchronicznie
async function getNumberInfo(number) {
  try {
    const response = await axios.get(
      `https://lukaszuk.net/numbers.php?number=${number}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Błąd pobierania danych z API: ${error.message}`);
  }
}

// Zapisywania do pliku asynchronicznie
async function saveToFile(filename, data) {
  try {
    await fs.promises.writeFile(filename, JSON.stringify(data));
    console.log(`Dane zostały zapisane do pliku ${filename}`);
  } catch (error) {
    throw new Error(
      `Błąd podczas zapisywania danych do pliku: ${error.message}`
    );
  }
}

async function final() {
  try {
    // dane z pliku data.json
    const getData = await fs.promises.readFile("data.json");
    const { number, filename } = JSON.parse(getData);

    const numberInfo = await getNumberInfo(number);

    // zapis do pliku
    await saveToFile(filename, numberInfo);
  } catch (error) {
    console.error(error.message);
  }
}

final();

//node app.js
// z data.json pobierana jest liczba
