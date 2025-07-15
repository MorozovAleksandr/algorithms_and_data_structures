// https://contest.yandex.ru/contest/22450/run-report/140148046/

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


const getDigitsFromField = (string) => {
    return string.trim().split("").map(Number).filter(item => !isNaN(item));
}

const sleightOfHand = (k, field, numberOfPlayers) => {
    const digits = getDigitsFromField(field);
    const totalK = k * numberOfPlayers;
    let points = 0;

    for (let t = 1; t <= 9; t++) {
        let count = digits.filter(digit => digit === t).length;

        if (count > 0 && count <= totalK) {
            points++;
        }
    }

    return points;
}

function solve() {
    const k = Number(getString());
    const fieldLength = 4;
    let field = '';
    for (let i = 0; i < fieldLength; i++) {
        field += getString();
    }

    const result = sleightOfHand(k, field, 2);

    process.stdout.write(`${result}`);
}