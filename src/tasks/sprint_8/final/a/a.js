// https://contest.yandex.ru/contest/26133/run-report/147403705/
const _readline = require('readline');
const _reader = _readline.createInterface({input: process.stdin});
const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line)
});

process.stdin.on('end', solve);

const getString = () => _inputLines[_curLine++];

const getPackedStrings = (count) => {
    const strings = [];
    for (let i = 0; i < count; i++) {
        strings.push(getString());
    }
    return strings;
}

const isDigit = (char) => /\d/.test(char);

const SQUARE_BRACKETS = {
    LEFT: '[', RIGHT: ']',
}

function decodeString(string, limit = Infinity) {
    const stack = [];
    let curr = '';
    let num = 0;

    for (const char of string) {
        if (isDigit(char)) {
            num = num * 10 + Number(char);
        } else if (char === SQUARE_BRACKETS.LEFT) {
            stack.push([curr, num]);
            curr = '';
            num = 0;
        } else if (char === SQUARE_BRACKETS.RIGHT) {
            const [prev, times] = stack.pop();
            curr = prev + curr.repeat(times);
            if (curr.length > limit) curr = curr.slice(0, limit);
        } else {
            curr += char;
            if (curr.length > limit) curr = curr.slice(0, limit);
        }
    }

    return curr;
}

function commonPrefix(a, b) {
    let i = 0;
    const len = Math.min(a.length, b.length);
    while (i < len && a[i] === b[i]) i++;
    return a.slice(0, i);
}

function solve() {
    const countStrings = Number(getString());
    const packedStrings = getPackedStrings(countStrings);
    let prefix = decodeString(packedStrings[0]);

    for (let i = 1; i < countStrings; i++) {
        const decoded = decodeString(packedStrings[i], prefix.length);
        prefix = commonPrefix(prefix, decoded);
        if (prefix.length === 0) break;
    }

    console.log(prefix);
}
