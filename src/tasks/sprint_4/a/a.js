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

function solve() {
    const countRecords = Number(getString());
    const records = new Set();
    for (let i = 0; i < countRecords; i++) {
        records.add(getString());
    }

    for (const record of records) {
        console.log(record);
    }
}
