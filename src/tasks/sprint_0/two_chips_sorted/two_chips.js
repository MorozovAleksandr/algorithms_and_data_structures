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

const twoSum = (array, targetSum) => {
    for (let i = 0; i < array.length; i++) {
        const targetNumber = targetSum - array[i];

        let left = i + 1;
        let right = array.length - 1;

        while (left <= right) {
            const midIndex = Math.floor((left + right) / 2);
            const midValue = array[midIndex];
            if (midValue === targetNumber) {
                return [array[i], midValue];
            } else if (midValue > targetNumber) {
                right = midIndex - 1;
            } else {
                left = midIndex + 1;
            }
        }

    }

    return [];
}


function solve() {
    const length = Number(getString());
    const array = getArray(getString());
    const targetSum = Number(getString());


    const result = twoSum(array, targetSum)

    if (result.length === 0) {
        console.log("None")
    } else {
        process.stdout.write(result.join(" "));
    }
}