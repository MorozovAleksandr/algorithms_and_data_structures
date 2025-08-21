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

const comparison = (word1, word2) => {
    const letterMap = new Map();
    const usedLetters = new Set();

    if (word1.length !== word2.length) {
        return false;
    }

    for (let i = 0; i < word1.length; i++) {
        const char1 = word1[i];
        const char2 = word2[i];
        const letterIsHas = letterMap.has(char1);
        if (letterIsHas && letterMap.get(char1) !== char2) {
            return false;
        }

        if (!letterIsHas && usedLetters.has(char2)) {
            return false;
        }

        usedLetters.add(char2);
        letterMap.set(char1, char2);
    }

    return true;
}

function solve() {
    const word1 = getString();
    const word2 = getString();

    const result = comparison(word1, word2);

    console.log(result ? "YES" : "NO");
}
