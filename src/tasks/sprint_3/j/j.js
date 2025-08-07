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

const printArray = (arr) => console.log(arr.join(' '));

const bubbleSort = (arr) => {
    let countOfChanges = 0;
    let n = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                countOfChanges++;
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--;
        if (swapped) {
            printArray(arr)
        }
    } while (swapped);

    if (countOfChanges === 0) {
        printArray(arr);
    }
};


function solve() {
    const length = Number(getString());
    const arr = splitString(getString());

    bubbleSort(arr);
}

