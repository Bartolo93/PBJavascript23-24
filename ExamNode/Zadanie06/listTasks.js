const fs = require("fs");

async function listTasks() {
  try {
    const data = await fs.promises.readFile("tasks.json");
    const tasks = JSON.parse(data);
    console.log("Lista zadań:");
    tasks.forEach((task, index) => console.log(`${index + 1}. ${task.task}`));
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Brak zadań do wykonania.");
    } else {
      console.error("Błąd:", error.message);
    }
  }
}

module.exports = listTasks;
