function removeSpaces(str) {
    return str.replace(/\s+/g, '');
  }
  
  const prompt = require("prompt-sync")();
  let inputStr = prompt("Введите строку:");
  console.log("Строка без пробелов:", removeSpaces(inputStr));
  