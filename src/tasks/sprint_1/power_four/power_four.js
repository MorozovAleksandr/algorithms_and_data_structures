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

const isPowerOfFour = (number) => {
    while (number % 4 === 0) {
        number = number / 4;
    }

    return number === 1;
};

function solve() {
    const number = Number(getString());
    if (isPowerOfFour(number)) {
        console.log("True");
    } else {
        console.log("False");
    }
}
