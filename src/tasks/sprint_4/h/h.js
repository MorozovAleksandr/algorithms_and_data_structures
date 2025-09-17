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

const getMaxSubString = (str) => {
    let maxLength = 0;
    const charSet = new Set();
    let left = 0;

    for (let right = 0; right < str.length; right++) {
        while (charSet.has(str[right])) {
            charSet.delete(str[left]);
            left++;
        }
        charSet.add(str[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

function solve() {
    const string = getString();

    console.log(getMaxSubString(string));
}