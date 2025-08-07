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

const comparator = (a, b) => {
    const item1 = Number(String(a) + String(b));
    const item2 = Number(String(b) + String(a));


    return item1 > item2;
}

const insertSortByKey = (arr, comparator) => {
    for (let i = 1; i < arr.length; i++) {
        const insertItem = arr[i];
        let j = i;

        while (j > 0 && comparator(insertItem, arr[j - 1])) {
            arr[j] = arr[j - 1];
            j--;
        }

        arr[j] = insertItem;
    }
    
    return arr;
}

function solve() {
    const countNumbers = Number(getString());
    const numbers = splitString(getString());

    console.log(insertSortByKey(numbers, comparator).reduce((acc, curr) => acc + curr, ''));
}