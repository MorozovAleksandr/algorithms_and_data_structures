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

const getCountCommits = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    }
    return getCountCommits(n - 1) + getCountCommits(n - 2);
}

function solve() {
    const internNumber = Number(getString());

    const result = getCountCommits(internNumber);

    console.log(result);
}