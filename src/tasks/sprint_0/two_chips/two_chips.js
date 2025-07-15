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
    return string.trim().split(" ").map(item => Number(item));
}

const twoSum = (length, array, targetSum) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === targetSum) {
                return [array[i], array[j]];
            }
        }
    }

    return [];
}


function solve() {
    const length = Number(getString());
    const array = getArray(getString());
    const targetSum = Number(getString());

    const result = twoSum(length, array, targetSum)

    if (result.length === 0) {
        console.log("None")
    } else {
        process.stdout.write(result.join(" "));
    }
}