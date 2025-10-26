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

const findLCS = (n, a, m, b) => {
    const dp = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const lcsA = [];
    const lcsB = [];

    let i = n, j = m;

    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            lcsA.push(i);
            lcsB.push(j);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    lcsA.reverse();
    lcsB.reverse();

    return {
        length: dp[n][m],
        indicesA: lcsA,
        indicesB: lcsB
    };
}

function solve() {
    const n = Number(getString());
    const a = splitString(getString());
    const m = Number(getString());
    const b = splitString(getString());

    const result = findLCS(n, a, m, b);
    
    console.log(result.length);
    console.log(result.indicesA.join(' '));
    console.log(result.indicesB.join(' '));
}