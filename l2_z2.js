//Создание массива с четными числами до N. Пользователь вводит N, программа создает массив четных чисел до N.
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createEvenArray(N) {
    const evenNumbers = [];
    for (let i = 0; i <= N; i++) {
        if (i % 2 === 0) {
            evenNumbers.push(i); 
        }
    }
    return evenNumbers;
}

rl.question("Введите значение N: ", (input) => {
    const N = parseInt(input, 10);
    console.log("Четные числа до N:", createEvenArray(N));
    rl.close();
});
