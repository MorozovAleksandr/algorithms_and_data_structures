const _readline = require('readline');
const _reader = _readline.createInterface({input: process.stdin});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

const getString = () => {
    return _inputLines[_curLine++];
}

const getArray = (string) => {
    return string.trim().split(" ").map(item => Number(item));
}

const getWindowSum = (arr) => arr.reduce((sum, x) => sum + x, 0);

const movingAverage = (length, arr, windowSize) => {
    const countAveragesNumbers = length - windowSize + 1;
    const result = [];

    let windowSum = getWindowSum(arr.slice(0, windowSize));
    result.push(windowSum / windowSize);

    for (let i = 1; i < countAveragesNumbers; i++) {
        windowSum = windowSum - arr[i - 1] + arr[i + windowSize - 1]
        result.push(windowSum / windowSize);
    }

    return result;
}

function solve() {
    const length = Number(getString());
    const arr = getArray(getString());
    const windowsSize = Number(getString());

    process.stdout.write(movingAverage(length, arr, windowsSize).join(" "));
}