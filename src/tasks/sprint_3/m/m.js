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

const mergeSort = (arr1, arr2) => {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function solve() {
    const n = Number(getString());
    const m = Number(getString());
    const northPopulated = splitString(getString());
    const southPopulated = splitString(getString());

    const result = mergeSort(northPopulated, southPopulated);

    if (result.length % 2 === 0) {
        console.log((result[result.length / 2] + result[result.length / 2 - 1]) / 2);
    } else {
        console.log(result[Math.floor(result.length / 2)]);
    }
}