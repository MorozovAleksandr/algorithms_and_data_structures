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

function sumOfBinaries(firstNumber, secondNumber) {
    const maxLength = Math.max(firstNumber.length, secondNumber.length);
    firstNumber = firstNumber.padStart(maxLength, '0');
    secondNumber = secondNumber.padStart(maxLength, '0');
    let carry = 0;
    let result = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        const sum = parseInt(firstNumber[i]) + parseInt(secondNumber[i]) + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    if (carry) {
        result = '1' + result;
    }

    return result;
}

function solve() {
    const firstNumber = getString();
    const secondNumber = getString();
    process.stdout.write(`${sumOfBinaries(firstNumber, secondNumber)}`);
}
