const axios = require("axios");

async function getRepo(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Nie udało się pobrać danych z repozytoriów użytkownika: ${username} ${error.message}`
    );
  }
}

module.exports = getRepo;
