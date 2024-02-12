const axios = require("axios");

async function getUser(userName) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${userName}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Nie można pobrać danych użytkownika ${error.message}`);
  }
}

module.exports = getUser;
