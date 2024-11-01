//Вывести индекс минимального элемента. Найдите индекс минимального элемента в массиве. 

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function findMinIndex(arr) {
    if (arr.length === 0) {
        return -1; // Если массив пустой, возвращаем -1
    }
    
    let minIndex = 0; // Начинаем с первого элемента
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[minIndex]) {
            minIndex = i; // Обновляем индекс минимального элемента
        }
    }
    return minIndex;
}

// Ввод массива с клавиатуры
rl.question("Введите числа через запятую: ", (input) => {
    const inputArray = input.split(',').map(Number);
    console.log("Индекс минимального элемента:", findMinIndex(inputArray));
    rl.close();
});
