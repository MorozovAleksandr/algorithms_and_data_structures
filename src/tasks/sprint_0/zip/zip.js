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

const getArray = (string) => {
    return string.trim().split(" ").map(item => Number(item));
}

const zip = (length, firstArr, secondArr) => {
    let zipArray = [];
    for (let i = 0; i < length; i++) {
        zipArray.push(firstArr[i]);
        zipArray.push(secondArr[i])
    }

    return zipArray
}


function solve() {
    const length = Number(getString());
    const firstArr = getArray(getString());
    const secondArr = getArray(getString());

    const zipArr = zip(length, firstArr, secondArr);

    process.stdout.write(zipArr.join(" "));
}