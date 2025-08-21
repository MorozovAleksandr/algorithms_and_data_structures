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

const getMaxSegment = (rounds) => {
    let difference = 0;
    let maxLength = 0;
    const firstOccurrence = new Map();

    firstOccurrence.set(0, -1);

    for (let i = 0; i < rounds.length; i++) {
        difference += rounds[i] === 0 ? 1 : -1;

        if (firstOccurrence.has(difference)) {
            maxLength = Math.max(maxLength, i - firstOccurrence.get(difference));
        } else {
            firstOccurrence.set(difference, i);
        }
    }

    return maxLength;
}

function solve() {
    const length = Number(getString());
    const resultRounds = splitString(getString());

    const result = getMaxSegment(resultRounds);

    console.log(result);
}
