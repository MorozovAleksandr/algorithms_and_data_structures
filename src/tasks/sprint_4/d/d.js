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

const getHash = (basis, mod, string) => {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash = (hash * basis + string.charCodeAt(i)) % mod;
    }

    return hash;
}

function solve() {
    const basis = Number(getString());
    const mod = Number(getString());
    const string = getString();
    const string2 = getString();

    const hash = getHash(basis, mod, string);
    const hash2 = getHash(basis, mod, string2);

    console.log(hash, hash2);
}
