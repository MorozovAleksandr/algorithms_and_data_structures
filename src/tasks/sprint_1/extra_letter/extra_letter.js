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
    return string.trim().split("");
}

function getExcessiveLetter(firstLine, secondLine) {
    const firstArr = getArray(firstLine);
    const secondArr = getArray(secondLine);
    const map = new Map();

    for (let i = 0; i < firstArr.length; i++) {
        const count = (map.get(firstArr[i]) || 0) + 1;
        map.set(firstArr[i], count);
    }

    for (let i = 0; i < secondArr.length; i++) {
        if (!map.has(secondArr[i])) return secondArr[i];
        const count = map.get(secondArr[i]) - 1;

        if (count < 0) {
            return secondArr[i];
        }

        map.set(secondArr[i], count);
    }
}

function solve() {
    const firstLine = getString();
    const secondLine = getString();
    process.stdout.write(`${getExcessiveLetter(firstLine, secondLine)}`);
}