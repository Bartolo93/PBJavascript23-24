const fs = require("fs"); // metoda  fs.statsSync
const path = require("path");

const filename = __filename; // Globalna zmienna zawierającą pełną ścieżkę do bieżącego pliku

function displayFileDetails(filePath) {
  try {
    // fs.statsSync pobiera info o pliku
    const infoFile = fs.statSync(filePath);

    console.log("Szczegóły pliku:");
    console.log("Nazwa pliku:", path.basename(filePath));
    console.log("Czas utworzenia:", infoFile.birthtime);
    console.log("Czas modyfikacji:", infoFile.mtime);
    console.log("Rozmiar:", infoFile.size + " bajtów");
  } catch (error) {
    console.error(" Błąd podczas odczytu szczegółów pliku:");
  }
}

displayFileDetails(filename);

// node app.js
