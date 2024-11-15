// Находим элементы на странице
const currencySelect = document.getElementById('currency');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const fluctuationChartCanvas = document.getElementById('fluctuationChart');
let fluctuationChart; // Переменная для графика

// Добавляем обработчик на изменение валюты
currencySelect.addEventListener('change', () => {
    const currency = currencySelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        alert('Пожалуйста, выберите начальную и конечную даты.');
        return;
    }

    getExchangeRates(currency, startDate, endDate);
});

// Добавляем обработчик на изменение дат
startDateInput.addEventListener('change', () => {
    const currency = currencySelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (currency && startDate && endDate) {
        getExchangeRates(currency, startDate, endDate);
    }
});

endDateInput.addEventListener('change', () => {
    const currency = currencySelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (currency && startDate && endDate) {
        getExchangeRates(currency, startDate, endDate);
    }
});

// Функция для получения данных о курсе валют за указанный период
function getExchangeRates(currency, startDate, endDate) {
    const apiKey = 'p4aRjlS960dSpY53Aabo3xMLyg5vUJKv';
    const url = `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDate}&end_date=${endDate}&base=RUB&symbols=${currency}`;

    const requestOptions = {
        method: 'GET',
        headers: {
            apikey: apiKey,
        },
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.info);
            }

            // Извлекаем курсы валют за указанный период
            const rates = Object.entries(data.rates).map(([date, rate]) => ({
                date,
                value: rate[currency],
            }));

            updateChart(rates, currency);
        })
        .catch(error => {
            console.error('Ошибка получения данных:', error);
            alert('Не удалось получить данные. Попробуйте снова.');
        });
}

// Функция для обновления графика
function updateChart(rates, currency) {
    const labels = rates.map(rate => rate.date); // Даты
    const data = rates.map(rate => rate.value); // Курс валют

    // Если график уже существует, обновляем его данные
    if (fluctuationChart) {
        fluctuationChart.data.labels = labels;
        fluctuationChart.data.datasets[0].data = data;
        fluctuationChart.data.datasets[0].label = `Курс RUB к ${currency}`;  // Обновляем метку
        fluctuationChart.update();
    } else {
        // Создаем новый график
        fluctuationChart = new Chart(fluctuationChartCanvas, {
            type: 'line', // Линейный график
            data: {
                labels: labels,
                datasets: [{
                    label: `Курс RUB к ${currency}`,  // Обновляем метку
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Дата',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Курс',
                        },
                    },
                },
            },
        });
    }
}
