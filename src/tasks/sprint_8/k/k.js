const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

const getString = () => {
    return _inputLines[_curLine++];
};

const isEvenChar = (char) => (char.charCodeAt(0) - 'a'.charCodeAt(0) + 1) % 2 === 0

const filterString = (string) => {
    let result = '';
    for (let i = 0; i < string.length; i++) {
        if (isEvenChar(string[i])) {
            result += string[i];
        }
    }

    return result;
}

const compareStrings = (a, b) => {
    const filteredA = filterString(a);
    const filteredB = filterString(b);

    if (filteredA === filteredB) return 0;

    return filteredA < filteredB ? -1 : 1;
}

function solve() {
    const a = getString();
    const b = getString();

    const result = compareStrings(a, b);

    console.log(result);
}