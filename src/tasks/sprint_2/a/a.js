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
    return string.trim().split(" ");
}

const getTransposeMatrix = (matrix) => {
    const transposeMatrix = [];

    for (let i = 0; i < matrix[0].length; i++) {
        const newLine = [];
        for (let j = 0; j < matrix.length; j++) {
            newLine.push(matrix[j][i]);
        }
        transposeMatrix.push(newLine);
    }

    return transposeMatrix;
}

function solve() {
    const countLines = Number(getString());
    const countColumns = Number(getString());
    const matrix = [];

    if (!countLines || !countColumns) {
        return;
    }
    
    for (let i = 0; i < countLines; i++) {
        matrix.push(getArray(getString()));
    }

    const result = getTransposeMatrix(matrix);

    for (let i = 0; i < result.length; i++) {
        console.log(`${result[i].join(" ")}`);
    }
}