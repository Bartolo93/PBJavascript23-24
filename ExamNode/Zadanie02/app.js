/* [2 punkty] Napisz aplikację która przyjmuje w parametrze uruchamiania ciąg znaków a następnie wyświetli go w kolorach tęczy. Wykorzystaj moduł colors (https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów.

Sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem). */

const colors = require("colors");
//const yargs = require("yargs");
// npm i colors@1.3.2

/* let myColorText = yargs.argv.input;
let convertedText = JSON.stringify(myColorText).rainbow;
console.log(convertedText); */
//node app.js --input=Hello_My_Friend_!

function printText() {
  try {
    let myColoredText = process.argv[2];
    let covertedText = JSON.stringify(myColoredText).rainbow;
    console.log(covertedText);
  } catch (error) {
    console.error(" Oh no, I can't find input ! ");
  }
}

printText();

//node app.js hello_my_World_!
