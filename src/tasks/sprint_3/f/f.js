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

const mergeSort = (arr) => {
    if (arr.length === 1) {
        return arr;
    }

    const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
    const right = mergeSort(arr.slice(Math.floor(arr.length / 2)));

    const result = [];

    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] > right[rightIdx]) {
            result.push(left[leftIdx]);
            leftIdx++;
        } else {
            result.push(right[rightIdx]);
            rightIdx++;
        }
    }

    while (leftIdx < left.length) {
        result.push(left[leftIdx]);
        leftIdx++;
    }

    while (rightIdx < right.length) {
        result.push(right[rightIdx]);
        rightIdx++;
    }

    return result;
}

const getMaxPerimeter = (segments) => {
    segments = mergeSort(segments);

    for (let i = 0; i < segments.length - 2; i++) {
        const a = segments[i];
        const b = segments[i + 1];
        const c = segments[i + 2];

        if (b + c > a) {
            return a + b + c;
        }
    }
}

function solve() {
    const countSegment = Number(getString());
    const segments = splitString(getString());

    console.log(getMaxPerimeter(segments));
}