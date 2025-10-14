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

const WHITE = 'white';
const GRAY = 'gray';
const BLACK = 'black';

const getRibs = count => {
    const ribs = [];

    for (let i = 0; i < count; i++) {
        ribs.push(splitString(getString()));
    }

    return ribs;
}


function solve() {
    const [countPeaks, countRibs] = splitString(getString());

    const adjacencyList = new Array(countPeaks + 1);
    for (let i = 0; i <= countPeaks; i++) {
        adjacencyList[i] = [];
    }

    for (let i = 0; i < countRibs; i++) {
        const [u, v] = splitString(getString());
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    const rootPeaks = Number(getString());

    for (let i = 1; i <= countPeaks; i++) {
        adjacencyList[i].sort((a, b) => a - b);
    }

    const WHITE = 0, GRAY = 1;
    const colorPeaks = new Uint8Array(countPeaks + 1);
    const greyPeaks = [];
    const stack = [rootPeaks];

    while (stack.length > 0) {
        const v = stack.pop();

        if (colorPeaks[v] === WHITE) {
            colorPeaks[v] = GRAY;
            greyPeaks.push(v);

            for (let i = adjacencyList[v].length - 1; i >= 0; i--) {
                const neighbor = adjacencyList[v][i];
                if (colorPeaks[neighbor] === WHITE) {
                    stack.push(neighbor);
                }
            }
        }
    }

    console.log(greyPeaks.join(' '));
}