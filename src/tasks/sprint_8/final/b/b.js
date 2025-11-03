//https://contest.yandex.ru/contest/26133/run-report/147406305/
const _readline = require('readline');
const _reader = _readline.createInterface({input: process.stdin});
const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

const getString = () => _inputLines[_curLine++];

const getWords = count => {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(getString());
    }
    return words;
};

const canBeSegmented = (text, dict) => {
    const dp = new Array(text.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= text.length; i++) {
        for (let word of dict) {
            const len = word.length;
            if (i >= len && dp[i - len]) {
                if (text.slice(i - len, i) === word) {
                    dp[i] = true;
                    break;
                }
            }
        }
    }

    return dp[text.length];
}

const printResult = (result) => console.log(result ? 'YES' : 'NO');

function solve() {
    const text = getString();
    const n = Number(getString());
    const words = getWords(n);

    const dict = new Set(words);
    const result = canBeSegmented(text, dict);

    printResult(result);
}
