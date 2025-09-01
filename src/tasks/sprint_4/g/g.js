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

const solution = (a, arr) => {
    const history = new Set();
    const fourth = new Set();

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                const target = a - arr[i] - arr[j] - arr[k];
                if (history.has(target)) {
                    const four = [target, arr[i], arr[j], arr[k]].sort((a, b) => a - b).toString();
                    fourth.add(four);
                }
            }
        }
        history.add(arr[i]);
    }


    return [...fourth].map(four => four.split(',')).sort((a, b) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return a[i] - b[i];
            }
        }

        return a.length - b.length;
    });
}

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