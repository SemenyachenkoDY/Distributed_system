const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function filterArray(arr, threshold) {
    return arr.filter(item => item > threshold); // Оставляем только элементы больше указанного значения
}

// Ввод массива и порога с клавиатуры
rl.question("Введите числа через запятую: ", (input) => {
    const originalArray = input.split(',').map(Number);
    
    rl.question("Введите пороговое значение: ", (thresholdInput) => {
        const threshold = parseInt(thresholdInput, 10);
        console.log("Отфильтрованный массив:", filterArray(originalArray, threshold));
        rl.close();
    });
});
