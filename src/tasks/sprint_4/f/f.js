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

const preCalcPrefix = (basis, mod, string) => {
    const prefix = new Array(string.length + 1).fill(0);

    for (let i = 0; i < string.length; i++) {
        prefix[i + 1] = (prefix[i] * basis + string.charCodeAt(i)) % mod;
    }

    return prefix;
}

const preCalcPowers = (basis, mod, length) => {
    const powers = new Array(length).fill(1);

    for (let i = 1; i <= length; i++) {
        powers[i] = (powers[i - 1] * basis) % mod;
    }

    return powers;
}

const getHashSubString = (requests, prefix, powers, mod) => {
    const result = [];

    for (let i = 0; i < requests.length; i++) {
        const left = requests[i][0] - 1;
        const right = requests[i][1] - 1;
        const length = right - left + 1;

        let hash = (prefix[right + 1] - prefix[left] * powers[length] % mod + mod) % mod;
        result.push(hash);
    }

    return result;
}

function solve() {
    const basis = Number(getString());
    const mod = Number(getString());
    const string = getString();
    const countRequest = Number(getString());
    const requests = [];

    const prefix = preCalcPrefix(basis, mod, string);
    const powers = preCalcPowers(basis, mod, string.length);


    for (let i = 0; i < countRequest; i++) {
        const segment = splitString(getString());
        requests.push(segment);
    }

    const result = getHashSubString(requests, prefix, powers, mod);
    console.log(result.join('\n'));
}
