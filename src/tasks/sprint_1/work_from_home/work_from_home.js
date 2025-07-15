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

function getBinaryNumber(number) {
    if (number === 0) return '0';
    let binaryDigits = [];

    while (number > 0) {
        binaryDigits.push(number % 2);
        number = Math.floor(number / 2);
    }

    return binaryDigits.reverse().join('');
}

function solve() {
    const n = Number(getString());
    process.stdout.write(`${getBinaryNumber(n)}`);
}