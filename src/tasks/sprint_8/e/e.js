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

const splitString = (string) => {
    return string.trim().split(" ");
};

const getStringsToInsert = (number) => {
    const strings = [];

    for (let i = 0; i < number; i++) {
        const [str, pos] = splitString(getString());
        strings.push([str, Number(pos)]);
    }

    return strings.sort((a, b) => a[1] - b[1]);
};

const insertString = (initString, insertions) => {
    insertions.sort((a, b) => a[1] - b[1]);

    const result = [];
    let currentPos = 0;

    for (const [str, pos] of insertions) {
        result.push(initString.substring(currentPos, pos));
        result.push(str);
        currentPos = pos;
    }
    
    result.push(initString.substring(currentPos));

    return result.join('');
};

function solve() {
    const initString = getString();
    const n = Number(getString());
    const stringToInsert = getStringsToInsert(n);

    console.log(insertString(initString, stringToInsert));
}