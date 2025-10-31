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

const shiftSearch = (temperatures, partTemperatures) => {
    const result = [];
    
    if (partTemperatures.length > temperatures.length) {
        return result;
    }

    if (partTemperatures.length === 1) {
        for (let i = 0; i < temperatures.length; i++) {
            if (temperatures[i] === partTemperatures[0]) {
                result.push(i + 1);
            }
        }
        return result;
    }

    const tempDiffs = [];
    for (let i = 1; i < temperatures.length; i++) {
        tempDiffs.push(temperatures[i] - temperatures[i - 1]);
    }

    const partDiffs = [];
    for (let i = 1; i < partTemperatures.length; i++) {
        partDiffs.push(partTemperatures[i] - partTemperatures[i - 1]);
    }

    const lps = computeLPS(partDiffs);
    let i = 0;
    let j = 0;

    while (i < tempDiffs.length) {
        if (partDiffs[j] === tempDiffs[i]) {
            i++;
            j++;
        }

        if (j === partDiffs.length) {
            result.push(i - j + 1);
            j = lps[j - 1];
        } else if (i < tempDiffs.length && partDiffs[j] !== tempDiffs[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

const computeLPS = (pattern) => {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function solve() {
    const n = Number(getString());
    const temperatures = splitString(getString());
    const m = Number(getString());
    const partTemperatures = splitString(getString());

    const result = shiftSearch(temperatures, partTemperatures);

    console.log(result.join(' '));
}