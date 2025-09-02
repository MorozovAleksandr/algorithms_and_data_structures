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

const solution = (target, arr) => {
    arr.sort((a, b) => a - b);
    const results = [];

    for (let i = 0; i < arr.length - 3; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue; // пропускаем дубликаты

        for (let j = i + 1; j < arr.length - 2; j++) {
            if (j > i + 1 && arr[j] === arr[j - 1]) continue; // пропускаем дубликаты

            let left = j + 1;
            let right = arr.length - 1;

            while (left < right) {
                const sum = arr[i] + arr[j] + arr[left] + arr[right];
                if (sum === target) {
                    results.push([arr[i], arr[j], arr[left], arr[right]]);
                    // пропускаем дубликаты
                    while (left < right && arr[left] === arr[left + 1]) left++;
                    while (left < right && arr[right] === arr[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return results;
};


function solve() {
    const length = Number(getString());
    const a = Number(getString());
    const arr = splitString(getString());

    const result = solution(a, arr);

    console.log(result.length);

    for (let i = 0; i < result.length; i++) {
        console.log(result[i].join(' '));
    }
}