const fs = require("fs");

async function deleteTask(taskNumber) {
  try {
    const data = await fs.readFileSync("tasks.json");
    let tasks = JSON.parse(data);

    if (taskNumber <= 0 || tasks.length < taskNumber) {
      throw new Error("Zadanie o podanym numerze nie istnieje");
    }
    tasks.splice(taskNumber - 1, 1);

    await fs.promises.writeFile("tasks.json", JSON.stringify(tasks));

    console.log("Usunięto zadanie o podanym numerze");
  } catch (error) {
    console.error("Błąd", error.message);
  }
}

module.exports = deleteTask;
