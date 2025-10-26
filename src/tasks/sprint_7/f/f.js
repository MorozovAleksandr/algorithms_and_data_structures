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

const getNumberOfWays = (n, k) => {
    const MOD = 1e9 + 7;
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= k; j++) {
            if (i - j >= 1) {
                dp[i] = (dp[i] + dp[i - j]) % MOD;
            }
        }
    }

    return dp[n];
}

function solve() {
    const [n, k] = splitString(getString());

    console.log(getNumberOfWays(n, k));
}