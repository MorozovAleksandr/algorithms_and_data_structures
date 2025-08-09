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
    return str.trim().split(' ').map(Number);
}

const CLOTHES_COLORS = [0, 1, 2];

const countingSort = (arr, k) => {
    const countedValues = new Array(k).fill(0);

    for (const value of arr) {
        countedValues[value]++;
    }

    let index = 0;
    for (let i = 0; i < countedValues.length; i++) {
        for (let j = 0; j < countedValues[i]; j++) {
            arr[index] = i;
            index++;
        }
    }

    return arr;
}


function solve() {
    const countOfClothes = Number(getString());
    const arrClothes = splitString(getString());
    if (countOfClothes < 2) {
        return;
    }

    const result = countingSort(arrClothes, CLOTHES_COLORS.length);
    console.log(result.join(' '));
}