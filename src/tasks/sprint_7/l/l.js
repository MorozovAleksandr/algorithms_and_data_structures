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

const getMaxWeight = (n, M, weights) => {
    const dp = new Array(M + 1).fill(false);
    dp[0] = true;

    for (let i = 0; i < n; i++) {
        const weight = weights[i];
        for (let j = M; j >= weight; j--) {
            if (dp[j - weight]) {
                dp[j] = true;
            }
        }
    }

    for (let j = M; j >= 0; j--) {
        if (dp[j]) {
            return j;
        }
    }

    return 0;
}

function solve() {
    const [n, M] = splitString(getString());
    const weights = splitString(getString());

    console.log(getMaxWeight(n, M, weights));
}