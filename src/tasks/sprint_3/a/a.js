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

const genBrackets = (n, counterOpen, counterClose, prefix) => {
    if ((counterOpen + counterClose) === n * 2) {
        console.log(prefix);
    } else {
        if (counterOpen < n) {
            genBrackets(n, counterOpen + 1, counterClose, prefix + '(');
        }

        if (counterOpen > counterClose) {
            genBrackets(n, counterOpen, counterClose + 1, prefix + ')');
        }
    }
}

function solve() {
    const n = Number(getString());
    genBrackets(n, 0, 0, '');
}
