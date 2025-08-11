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

const splitString = (str) => {
    return str.trim().split(' ').map(Number);
}

const getChildrenSatisfied = (greedFactor, cookies) => {
    greedFactor = greedFactor.sort((a, b) => a - b)
    cookies = cookies.sort((a, b) => a - b)
    let satisfiedChildren = 0;
    let cookieIndex = 0;
    let childIndex = 0;

    while (childIndex < greedFactor.length && cookieIndex < cookies.length) {
        const cookie = cookies[cookieIndex];
        const factor = greedFactor[childIndex];
        if (factor <= cookie) {
            satisfiedChildren++;
            childIndex++;
        }

        cookieIndex++;
    }

    return satisfiedChildren;
}

function solve() {
    const countOfChildren = Number(getString());
    const greedFactor = splitString(getString());
    const countOfCookies = Number(getString());
    const cookies = splitString(getString());

    console.log(getChildrenSatisfied(greedFactor, cookies));
}