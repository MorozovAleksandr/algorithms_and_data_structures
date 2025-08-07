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

const splitString = (str) => {
    return str.trim().split('').map(Number);
}

const isSubsequence = (line1, line2) => {
    if (line1.length > line2.length) {
        return false;
    }

    let index = 0;
    for (let i = 0; i < line2.length && index < line1.length; i++) {
        if (line1[index] === line2[i]) {
            index++;
        }
    }

    return index === line1.length;
}

function solve() {
    const line1 = getString();
    const line2 = getString();
    console.log(isSubsequence(line1, line2) ? 'True' : 'False');
}