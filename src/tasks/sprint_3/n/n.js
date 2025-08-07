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

const getFlowerbeds = (segments) => {
    segments.sort((a, b) => a[0] - b[0]);
    const merged = [segments[0]];

    for (let i = 1; i < segments.length; i++) {
        const lastInterval = merged[merged.length - 1];
        const currentInterval = segments[i];
        
        if (lastInterval[1] >= currentInterval[0]) {
            merged[merged.length - 1] = [Math.min(lastInterval[0], currentInterval[0]), Math.max(lastInterval[1], currentInterval[1])];
        } else {
            merged.push(currentInterval);
        }
    }

    return merged;
}

function solve() {
    const length = Number(getString());
    const segments = [];
    for (let i = 0; i < length; i++) {
        segments.push(splitString(getString()));
    }

    const result = getFlowerbeds(segments);

    for (let j = 0; j < result.length; j++) {
        console.log(result[j].join(' '));
    }
}