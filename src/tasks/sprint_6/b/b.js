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

const getRibs = count => {
    const ribs = [];

    for (let i = 0; i < count; i++) {
        ribs.push(splitString(getString()));
    }

    return ribs;
}

const createAdjacencyMatrix = (countPeaks, ribs) => {
    const adjacencyMatrix = Array.from({length: countPeaks}, () => new Array(countPeaks).fill(0));
    for (const [from, to] of ribs) {
        adjacencyMatrix[from - 1][to - 1] = 1;
    }

    return adjacencyMatrix;
}

const printAdjacencyMatrix = adjacencyMatrix => {
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        console.log(adjacencyMatrix[i].join(' '));
    }
}

function solve() {
    const [countPeaks, countRibs] = splitString(getString());

    const ribs = getRibs(countRibs);

    const adjacencyMatrix = createAdjacencyMatrix(countPeaks, ribs);
    
    printAdjacencyMatrix(adjacencyMatrix);
}
