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

const splitString = (string) => {
    return string.trim().split(" ").map(Number);
}

function solve() {
    const n = Number(getString());
    const prices = splitString(getString());

    let maxProfit = 0;

    for (let i = 1; i < n; i++) {

        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];

        }
    }

    console.log(maxProfit);
}