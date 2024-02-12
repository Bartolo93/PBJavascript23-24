const getUser = require("./getUser05.js");
const getRepo = require("./getRepo05.js");
const getWeather = require("./getWeather05.js");

async function final() {
  try {
    const userName = process.argv[2];
    const getFollowers = process.argv[3] === "yes";
    const userData = await getUser(userName);

    console.log(`Nazwa użytkownika: ${userData.name} `);
    if (getFollowers) {
      console.log(`Liczba followersów: ${userData.followers}`);
    }

    const getRepos = await getRepo(userName);
    console.log(`Liczba repozytoriów: ${getRepos.length}`);
    console.log("Nazwy repozytoriów:");
    getRepos.forEach((repo) => console.log(repo.name));

    const weather = await getWeather(userData.location);
    console.log(
      `Pogoda w lokalizacji ${userData.location}:  ${weather.main}, ${weather.description}`
    );
  } catch (error) {
    console.error(error.message);
  }
}

final();

// node app.js jimmy yes
