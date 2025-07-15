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

const parityCheck = (array) => {
    const firstParity = array[0] % 2 === 0;
    for (let i = 1; i < array.length; i++) {
        if ((array[i] % 2 === 0) !== firstParity) {
            return false;
        }
    }

    return true;
}


function solve() {
    const array = getArray(getString());

    const sameParity = parityCheck(array);

    process.stdout.write(sameParity ? "WIN" : "FAIL");
}