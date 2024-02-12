const fs = require("fs");

async function addTask(task) {
  try {
    let tasks = [];
    try {
      const data = await fs.promises.readFile("tasks.json");
      tasks = JSON.parse(data);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
    tasks.push({ task });

    await fs.promises.writeFile("tasks.json", JSON.stringify(tasks));

    console.log("Zadanie dodane do listy.");
  } catch (error) {
    console.error("Wystąpił błąd:", error.message);
  }
}

module.exports = addTask;
