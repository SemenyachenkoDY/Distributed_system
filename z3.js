//Вывести простые числа до N: программа выводит все простые числа до N.
    
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите число N: ', (n) => {
    const N = parseInt(n); 
    
    console.log(`Простые числа до ${N}:`);
    
    for (let i = 2; i <= N; i++) {
        let isPrime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false; 
                break;
            }
        }
        if (isPrime) {
            console.log(i);
        }
    }

    readline.close();
});
