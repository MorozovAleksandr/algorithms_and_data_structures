// https://contest.yandex.ru/contest/22450/run-report/140145543/

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
    return string.trim().split(" ").map(Number);
}

const distanceToZero = (arr) => {
    const distance = [];
    let lastZero = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            lastZero = i;
        }
        distance[i] = i - lastZero;
    }

    lastZero = Infinity;
    for (let j = arr.length - 1; j >= 0; j--) {
        if (arr[j] === 0) {
            lastZero = j;
        }

        if (lastZero - j < distance[j]) {
            distance[j] = lastZero - j;
        }
    }

    return distance;
}

function solve() {
    const length = Number(getString());
    const houseNumbers = getArray(getString());
    const result = distanceToZero(houseNumbers);

    process.stdout.write(`${result.join(' ')}`);
}