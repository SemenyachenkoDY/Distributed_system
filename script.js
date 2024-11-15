const boardSize = 8; // Размер доски
const mineCount = 10; // Количество мин
const board = document.getElementById('game-board');
const mineCounter = document.getElementById('mine-counter');
let minePositions = [];
let revealedCells = 0;
let flags = 0; // Количество установленных флагов

// Функция для создания доски
function createBoard() {
    board.innerHTML = '';
    minePositions = generateMines();
    revealedCells = 0;
    flags = 0;

    updateMineCounter();

    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleLeftClick);
        cell.addEventListener('contextmenu', handleRightClick); // Для установки флага
        board.appendChild(cell);
    }
}

// Генерация случайных позиций для мин
function generateMines() {
    const mines = new Set();
    while (mines.size < mineCount) {
        mines.add(Math.floor(Math.random() * boardSize * boardSize));
    }
    return Array.from(mines);
}

// Обработка клика левой кнопкой (открытие ячейки)
function handleLeftClick(e) {
    const index = parseInt(e.target.dataset.index);

    if (minePositions.includes(index)) {
        revealAllMines(); // Показываем все мины
        alert('Мина! Вы проиграли!');
        createBoard(); // Перезапускаем игру
    } else {
        revealCell(e.target, index);
        if (revealedCells === boardSize * boardSize - mineCount) {
            alert('Поздравляем! Вы победили!');
            createBoard();
        }
    }
}

// Обработка клика правой кнопкой (установка флага)
function handleRightClick(e) {
    e.preventDefault(); // Отменяем стандартное меню правой кнопки
    const cell = e.target;

    if (!cell.classList.contains('revealed')) {
        cell.classList.toggle('flag');
        flags += cell.classList.contains('flag') ? 1 : -1;

        if (flags > mineCount) {  // Если количество флагов превышает количество мин
            flags = mineCount;
            updateMineCounter();
            return;
        }

        checkForGameOver();
        updateMineCounter();
    }
}

// Обновление счетчика мин
function updateMineCounter() {
    mineCounter.textContent = `Осталось мин: ${mineCount - flags}`;
}

// Раскрытие ячейки и её соседей, если рядом нет мин
function revealCell(cell, index) {
    if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;

    cell.classList.add('revealed');
    revealedCells++;

    const adjacentMines = countAdjacentMines(index);

    if (adjacentMines > 0) {
        cell.textContent = adjacentMines;
        cell.classList.add(`mine-count-${adjacentMines}`);
    } else {
        const neighbors = getNeighbors(index);
        neighbors.forEach(neighborIndex => {
            const neighborCell = document.querySelector(`.cell[data-index='${neighborIndex}']`);
            revealCell(neighborCell, neighborIndex);
        });
    }
}

// Подсчёт количества мин вокруг данной ячейки
function countAdjacentMines(index) {
    return getNeighbors(index).reduce((count, neighborIndex) => {
        return count + (minePositions.includes(neighborIndex) ? 1 : 0);
    }, 0);
}

// Получение соседей для данной ячейки
function getNeighbors(index) {
    const neighbors = [];
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const newRow = row + dx;
            const newCol = col + dy;

            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                neighbors.push(newRow * boardSize + newCol);
            }
        }
    }
    return neighbors;
}

// Проверка на окончание игры
function checkForGameOver() {
    // Проверяем, если все флаги установлены правильно
    if (flags === mineCount) {
        let correctFlags = 0;
        document.querySelectorAll('.cell').forEach(cell => {
            if (cell.classList.contains('flag')) {
                const index = parseInt(cell.dataset.index);
                if (minePositions.includes(index)) {
                    correctFlags++;
                }
            }
        });

        if (correctFlags === mineCount) {
            alert('Поздравляем! Вы победили!');
            createBoard();
        } else {
            revealAllMines();
            alert('Ошибка! Вы проиграли!');
            createBoard();
        }
    }
}

// Раскрытие всех мин (при поражении)
function revealAllMines() {
    minePositions.forEach(mineIndex => {
        const mineCell = document.querySelector(`.cell[data-index='${mineIndex}']`);
        
        if (mineCell && !mineCell.classList.contains('revealed')) {
            mineCell.classList.add('revealed');
            mineCell.textContent = '💣';  // Добавляем символ мину (💣) в ячейку
            mineCell.classList.add('mine');  // Применяем класс для мин
        }
    });
}

// Запуск игры при загрузке страницы
createBoard();
