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
    return string.trim().split(" ").map(item => Number(item));
}

const quadraticFunction = (a, x, b, c) => a * Math.pow(x, 2) + b * x + c


function solve() {
    const array = getArray(getString());

    const result = quadraticFunction(...array);

    process.stdout.write(`${result}`);
}