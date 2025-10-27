// https://contest.yandex.ru/contest/25597/run-report/146749728/
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

const getTotalPoints = (points) => points.reduce((a, b) => a + b, 0);

const processEqualSums = (points) => {
    const totalPoints = getTotalPoints(points);

    if (totalPoints % 2 !== 0) {
        return false;
    }

    const target = totalPoints / 2;

    const dp = Array.from({length: target + 1}, () => false);
    dp[0] = true;

    for (let point of points) {
        for (let sum = target; sum >= point; sum--) {
            dp[sum] = dp[sum] || dp[sum - point];
        }
    }

    return dp[target];
}

function solve() {
    const gamesWon = Number(getString());
    const gamePoints = splitString(getString());

    const result = processEqualSums(gamePoints);

    console.log(result ? 'True' : 'False');
}