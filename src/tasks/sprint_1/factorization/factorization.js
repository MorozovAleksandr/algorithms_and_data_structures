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

function factorize(number) {
    const factors = [];

    while (number % 2 === 0) {
        factors.push(2);
        number = number / 2;
    }

    for (let i = 3; i * i <= number; i += 2) {
        while (number % i === 0) {
            factors.push(i);
            number = number / i;
        }
    }

    if (number > 1) {
        factors.push(number);
    }

    return factors;
}

function solve() {
    const number = Number(getString());
    const factorization = factorize(number)
    process.stdout.write(`${factorization.join(' ')}`);
}