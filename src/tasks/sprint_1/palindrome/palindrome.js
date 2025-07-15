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

const isNonValidChar = (char) => /^[^a-zA-Z0-9]$/.test(char);


function isPalindrome(line) {
    let left = 0;
    let right = line.length - 1;

    while (left < right) {
        if (isNonValidChar(line[left])) {
            left++;
            continue;
        }

        if (isNonValidChar(line[right])) {
            right--;
            continue;
        }

        if (line[left].toLowerCase() === line[right].toLowerCase()) {
            left++;
            right--;
        } else {
            return false
        }
    }

    return true;
}

function solve() {
    const line = getString();
    if (isPalindrome(line)) {
        console.log("True")
    } else {
        console.log("False")
    }
}
