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

const printTop = (rating, printLength) => process.stdout.write(rating.slice(0, printLength).map(item => item[0]).join(' '));


const getTop = arr => {
    const universityMap = new Map();

    for (const university of arr) {
        const count = universityMap.has(university) ? universityMap.get(university) + 1 : 1;
        universityMap.set(university, count);
    }

    const universityPoints = [];
    for (const entry of universityMap.entries()) {
        universityPoints.push(entry)
    }
    universityPoints.sort((a, b) => {
        if (b[1] !== a[1]) {
            return b[1] - a[1];
        } else {
            return a[0] - b[0];
        }
    });

    return universityPoints;
}

function solve() {
    const students = Number(getString());
    const universities = splitString(getString());
    const printLength = Number(getString());

    printTop(getTop(universities), printLength);
}