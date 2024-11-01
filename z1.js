//Вывести таблицу умножения для числа N: программа выводит таблицу умножения для введенного числа N.
    
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите число N: ', (n) => {
    const N = parseInt(n); 
    console.log(`Таблица умножения для числа ${N}:`);
    
    for (let i = 1; i <= 10; i++) {
        console.log(`${N} * ${i} = ${N * i}`);
    }

    readline.close();
});
