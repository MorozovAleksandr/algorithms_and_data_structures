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

const createAdjacencyList = (countPeaks, ribs) => {
    const adjacencyList = [];

    for (const [from, to] of ribs) {
        if (Array.isArray(adjacencyList[from])) {
            adjacencyList[from].push(to);
        } else {
            adjacencyList[from] = [to];
        }
    }

    return adjacencyList;
}

const printAdjacencyList = (adjacencyList) => {
    for (let i = 1; i < adjacencyList.length; i++) {
        if (adjacencyList[i]) {
            console.log(adjacencyList[i].length, adjacencyList[i].sort((a, b) => a - b).join(' '));
        } else {
            console.log(0);
        }
    }
}

function solve() {
    const [countPeaks, countRibs] = splitString(getString());

    const ribs = getRibs(countRibs);

    const adjacencyList = createAdjacencyList(countPeaks, ribs);

    printAdjacencyList(adjacencyList);
}
