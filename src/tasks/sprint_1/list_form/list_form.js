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
    return string.trim().split(" ").map(Number);
}

function getSum(listNumber, number) {
    const kDigits = number.toString().split('').reverse().map(Number);
    const xDigits = listNumber.reverse();
    const maxLength = Math.max(kDigits.length, xDigits.length);
    const result = [];
    let carry = 0;

    for (let i = 0; i < maxLength || carry; i++) {
        const digitX = i < xDigits.length ? xDigits[i] : 0;
        const digitK = i < kDigits.length ? kDigits[i] : 0;
        const sum = digitK + digitX + carry;
        carry = Math.floor(sum / 10);
        result.push(sum % 10);
    }

    return result.reverse();
}

function solve() {
    const length = Number(getString());
    const listNumber = getArray(getString());
    const number = Number(getString());

    process.stdout.write(`${getSum(listNumber, number).join(' ')}`);
}