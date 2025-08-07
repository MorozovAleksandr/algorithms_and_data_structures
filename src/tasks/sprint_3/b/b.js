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

const splitString = (str) => {
    return str.trim().split('').map(Number);
}

const keyBoardMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
}


function solve() {
    const letters = splitString(getString()).map(key => keyBoardMap[key]);
    const result = [];
    const genCombinations = (letters, line, combination) => {
        if (line === letters.length) {
            result.push(combination);
            return;
        }

        const string = letters[line];
        for (const char of string) {
            genCombinations(letters, line + 1, combination + char);
        }
    }

    genCombinations(letters, 0, '');

    console.log(result.join(' '));
}
