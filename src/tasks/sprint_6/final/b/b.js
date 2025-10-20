// https://contest.yandex.ru/contest/25070/run-report/145858373/
const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line)
});

process.stdin.on('end', solve);

const getString = () => {
    return _inputLines[_curLine++];
}

const splitString = (string) => {
    return string.trim().split(" ").map(Number);
}

const getField = (rows) => {
    const field = [];

    for (let i = 0; i < rows; i++) {
        field.push(getString().trim().split(''));
    }

    return field;
}

const EARTH_SYMBOL = '#';
// Возможные направления движения: вверх, вниз, влево, вправо
const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];

const isValid = (x, y, rows, cols) => {
    return x >= 0 && x < rows && y >= 0 && y < cols;
};

const bfs = (visited, startX, startY, rows, cols, field) => {
    const queue = [[startX, startY]];
    visited[startX][startY] = true;
    let size = 0;

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        size++;

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValid(newX, newY, rows, cols) &&
                !visited[newX][newY] &&
                field[newX][newY] === EARTH_SYMBOL) {
                visited[newX][newY] = true;
                queue.push([newX, newY]);
            }
        }
    }

    return size;
};

const getIslandsStats = (rows, cols, field) => {
    const visited = Array.from({length: rows}, () => new Array(cols).fill(false));

    let islandCount = 0;
    let maxIslandSize = 0;


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (field[i][j] === EARTH_SYMBOL && !visited[i][j]) {
                const islandSize = bfs(visited, i, j, rows, cols, field);
                islandCount++;
                maxIslandSize = Math.max(maxIslandSize, islandSize);
            }
        }
    }

    return {islandCount, maxIslandSize};
}

function solve() {
    const [rows, cols] = splitString(getString());
    const field = getField(rows);

    const {islandCount, maxIslandSize} = getIslandsStats(rows, cols, field);
    console.log(`${islandCount} ${maxIslandSize}`);
}