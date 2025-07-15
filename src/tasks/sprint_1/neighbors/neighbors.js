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

const getArray = (string) => {
    return string.trim().split(" ").map(item => Number(item));
}

const getNeighbors = (rows, columns, matrix, posX, posY) => {
    const neighbors = [];

    if (posX > 0) {
        neighbors.push(matrix[posX - 1][posY]);
    }

    if (posY !== 0) {
        neighbors.push(matrix[posX][posY - 1])
    }

    if (posX < rows - 1) {
        neighbors.push(matrix[posX + 1][posY])
    }
    if (posY < columns - 1) {
        neighbors.push(matrix[posX][posY + 1]);
    }


    return neighbors;
}

function solve() {
    const rows = Number(getString());
    const columns = Number(getString());

    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const array = getArray(getString());
        matrix.push(array);
    }

    const posX = Number(getString());
    const posY = Number(getString());

    const neighbors = getNeighbors(rows, columns, matrix, posX, posY);

    process.stdout.write(neighbors.sort((a, b) => a - b).join(' '));
}