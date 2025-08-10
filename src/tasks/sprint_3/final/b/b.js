// https://contest.yandex.ru/contest/23815/run-report/140851212/
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

const printParticipants = arr => {
    for (let item of arr) {
        console.log(item[0]);
    }
}

const compareArrays = (a, b) => {
    const [nameA, pointsA, penaltyA] = a;
    const [nameB, pointsB, penaltyB] = b;

    if (pointsA !== pointsB) return pointsB - pointsA;

    if (penaltyA !== penaltyB) return penaltyA - penaltyB;

    return nameA.localeCompare(nameB);
};

const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return arr;

    const pivot = arr[Math.floor((left + right) / 2)];
    let tempLeft = left;
    let tempRight = right;

    while (tempLeft <= tempRight) {
        while (compareArrays(arr[tempLeft], pivot) < 0) tempLeft++;
        while (compareArrays(arr[tempRight], pivot) > 0) tempRight--;

        if (tempLeft <= tempRight) {
            [arr[tempLeft], arr[tempRight]] = [arr[tempRight], arr[tempLeft]];
            tempLeft++;
            tempRight--;
        }
    }

    if (left < tempRight) quickSort(arr, left, tempRight);
    if (tempLeft < right) quickSort(arr, tempLeft, right);

    return arr;
}

function solve() {
    const countParticipants = Number(getString());
    const participants = [];
    for (let i = 0; i < countParticipants; i++) {
        participants.push(splitString(getString()));
    }

    printParticipants(quickSort(participants));
}