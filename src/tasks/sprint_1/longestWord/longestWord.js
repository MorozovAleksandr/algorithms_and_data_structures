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

function getLongestWord(length, line) {
    let longestWord = line[0];

    for (let i = 1; i < line.length; i++) {
        if (longestWord.length < line[i].length) {
            longestWord = line[i];
        }
    }

    return longestWord;
}

function solve() {
    const length = Number(getString());
    const line = getArray(getString());
    const longestWord = getLongestWord(length, line)
    process.stdout.write(`${longestWord}`);
    process.stdout.write("\n");
    process.stdout.write(`${longestWord.length}`);
}