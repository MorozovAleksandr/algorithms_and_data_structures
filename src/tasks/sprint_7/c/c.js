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

const getHeaps = count => {
    const heaps = [];
    for (let i = 0; i < count; i++) {
        heaps.push(splitString(getString()));
    }

    return heaps;
}

const sortHeaps = heaps => heaps.sort((a, b) => b[0] - a[0]);

const getMaxAmount = (capacity, heaps) => {
    let maxAmount = 0;

    for (const [price, weight] of heaps) {
        if (capacity === 0) break;
        const take = Math.min(weight, capacity);
        maxAmount += price * take;
        capacity -= take;
    }
    
    return maxAmount;
}

function solve() {
    const capacity = Number(getString());
    const heapsCount = Number(getString());

    const heaps = sortHeaps(getHeaps(heapsCount));

    console.log(getMaxAmount(capacity, heaps));
}