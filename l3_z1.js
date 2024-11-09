function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}
const prompt = require("prompt-sync")();
let input = prompt("Введите числа через запятую:");
let numbers = input.split(",").map(Number);
console.log("Сумма элементов массива:", sumArray(numbers));
