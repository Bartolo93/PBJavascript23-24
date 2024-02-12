const yargs = require("yargs");
const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const listTasks = require("./listTasks");

yargs.command({
  command: "dodaj <task>",
  describe: "Dodaj nowe zadanie do listy",
  builder: {
    task: {
      describe: "Opis nowego zadania",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    addTask(argv.task);
  },
});

yargs.command({
  command: "usuń <task>",
  describe: "Usuń zadanie do listy",
  builder: {
    task: {
      describe: "Usuń wybrane zadanie z listy",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    deleteTask(argv.taskNumber);
  },
});

yargs.command({
  command: "lista",
  describe: "Wyświetl listę zadań",
  handler: () => {
    listTasks();
  },
});

yargs.parse();

//node app.js lista
// node app.js dodaj "zadanie"
//  node app.js usuń 1
