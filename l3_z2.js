function subtract(a, b) {
    return a - b;
  }
  
  const prompt = require("prompt-sync")();
  let num1 = prompt("Введите первое число: ");
  let num2 = prompt("Введите второе число: ");
  console.log("Разность чисел:", subtract(num1, num2));
  