const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

const getString = () => {
    return _inputLines[_curLine++];
};

function solve() {
    const string = getString();
    const n = string.length;
    const prefix = new Array(n).fill(0);

    for (let i = 1; i < n; i++) {
        let j = prefix[i - 1];

        while (j > 0 && string[i] !== string[j]) {
            j = prefix[j - 1];
        }

        if (string[i] === string[j]) {
            j++;
        }

        prefix[i] = j;
    }

    console.log(prefix.join(' '));
}