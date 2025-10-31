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

const borderControl = (a, b) => {
    const l1 = a.length;
    const l2 = b.length;
    const mod = Math.abs(l1 - l2);
    if (mod > 1) return false;

    if (mod === 0) {
        let fails = 0;

        for (let i = 0; i < l1; i++) {
            if (a[i] !== b[i]) {
                if (fails === 1) return false;
                fails++;
            }
        }
    } else {
        let fails = 0;
        let i = 0;
        let j = 0;
        [a, b] = l2 > l1 ? [b, a] : [a, b];

        while (i < a.length) {
            if (a[i] !== b[j]) {
                if (fails === 1) return false;
                i++;
                fails++;
            } else {
                i++;
                j++;
            }
        }
    }

    return true;
}

const printSolve = (result) => console.log(result ? 'OK' : 'FAIL');

function solve() {
    const a = getString();
    const b = getString();

    printSolve(borderControl(a, b));
}