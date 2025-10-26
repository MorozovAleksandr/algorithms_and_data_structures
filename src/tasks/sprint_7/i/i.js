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

function findMaxFlowersWithPath(field) {
    const n = field.length;
    const m = field[0].length;

    const dp = Array.from({length: n}, () => new Array(m).fill(0));

    dp[n - 1][0] = field[n - 1][0];
    
    for (let i = n - 2; i >= 0; i--) {
        dp[i][0] = dp[i + 1][0] + field[i][0];
    }

    for (let j = 1; j < m; j++) {
        dp[n - 1][j] = dp[n - 1][j - 1] + field[n - 1][j];
    }

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]) + field[i][j];
        }
    }

    let path = [];
    let i = 0, j = m - 1;

    while (i < n - 1 || j > 0) {
        if (i === n - 1) {
            path.push('R');
            j--;
        } else if (j === 0) {
            path.push('U');
            i++;
        } else {
            if (dp[i + 1][j] >= dp[i][j - 1]) {
                path.push('U');
                i++;
            } else {
                path.push('R');
                j--;
            }
        }
    }

    return {
        maxFlowers: dp[0][m - 1],
        path: path.reverse().join('')
    };
}

function solve() {
    const [n, m] = splitString(getString());

    const field = [];

    for (let i = 0; i < n; i++) {
        field.push(getString().trim().split('').map(Number));
    }

    const result = findMaxFlowersWithPath(field);
    console.log(result.maxFlowers);
    console.log(result.path);
}