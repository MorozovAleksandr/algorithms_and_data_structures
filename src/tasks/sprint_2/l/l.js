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

const getArray = (string) => {
    return string.trim().split(" ");
}

const getFibMod = (n, k) => {
    if (n === 0 || n === 1) return 1;

    const mod = Math.pow(10, k);
    let prev = 1;
    let curr = 1;

    for (let i = 2; i <= n; i++) {
        const next = (prev + curr) % mod;
        prev = curr;
        curr = next;
    }

    return curr;
}

function solve() {
    const [n, k] = getArray(getString());
    const result = getFibMod(n, k);
    console.log(result);
}