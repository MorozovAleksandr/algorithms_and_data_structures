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

const toNum = item => {
    const num = Number(item);
    return isNaN(num) ? item : num;
}

const splitString = (str) => {
    return str.trim().split(' ').map(toNum);
}

const output = arr => {
    for (let item of arr) {
        console.log(item[0]);
    }
}

const compareArrays = (a, b) => {
    const [nameA, pointsA, penaltyA] = a;
    const [nameB, pointsB, penaltyB] = b;

    if (pointsA > pointsB) return -1;
    if (pointsA < pointsB) return 1;

    if (penaltyA < penaltyB) return -1;
    if (penaltyA > penaltyB) return 1;

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    return 0;
};

const quickSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    } else {
        const pivot = arr[Math.floor(Math.random() * arr.length)];

        const left = [];
        const mid = [];
        const right = [];
        for (let i = 0; i < arr.length; i++) {
            const cmp = compareArrays(arr[i], pivot);
            if (cmp < 0) {
                left.push(arr[i]);
            } else if (cmp > 0) {
                right.push(arr[i]);
            } else {
                mid.push(arr[i]);
            }
        }

        return [...quickSort(left), ...quickSort(mid), ...quickSort(right)];
    }
}

function solve() {
    const countParticipants = Number(getString());
    const participants = [];
    for (let i = 0; i < countParticipants; i++) {
        participants.push(splitString(getString()));
    }
    const result = quickSort(participants);

    output(result);
}