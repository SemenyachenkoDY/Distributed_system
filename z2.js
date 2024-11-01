const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите число N: ', (n) => {
    const N = parseInt(n) ; 
    let sum = 0;

    for (let i = 2; i <= N; i += 2) { 
        sum += i;
    }

    console.log(`Сумма всех четных чисел до ${N}: ${sum}`);

    readline.close();
});
