// https://contest.yandex.ru/contest/24810/run-report/143736584/

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
    return string.trim().split(" ");
}

const toNum = item => {
    const num = Number(item);
    return isNaN(num) ? item : num;
}

const getSplitLines = (count) => {
    const lines = [];

    for (let i = 0; i < count; i++) {
        lines.push(splitString(getString()).map(toNum));
    }

    return lines;
}

const printParticipants = arr => {
    for (let item of arr) {
        console.log(item[0]);
    }
}

const compareParticipants = (a, b) => {
    const [nameA, pointsA, penaltyA] = a;
    const [nameB, pointsB, penaltyB] = b;

    if (pointsA !== pointsB) return pointsB - pointsA;

    if (penaltyA !== penaltyB) return penaltyA - penaltyB;

    return nameA.localeCompare(nameB);
};

class Heap {
    constructor(comparator) {
        this.heap = [null];
        this.comparator = comparator;
    }

    siftUp(index) {
        while (index > 1) {
            const parentIndex = Math.floor(index / 2);

            if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    add(item) {
        this.heap.push(item);
        this.siftUp(this.heap.length - 1);
    }

    siftDown(index) {
        while (true) {
            const left = index * 2;
            const right = index * 2 + 1;
            let largest = index;

            if (left < this.heap.length && this.comparator(this.heap[left], this.heap[largest]) < 0) {
                largest = left;
            }

            if (right < this.heap.length && this.comparator(this.heap[right], this.heap[largest]) < 0) {
                largest = right;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    pop() {
        if (this.heap.length <= 1) return null;
        const result = this.heap[1];
        this.heap[1] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.siftDown(1);
        return result;
    }

    sortedToArray() {
        const result = [];
        while (this.heap.length > 1) {
            result.push(this.pop());
        }

        return result;
    }
}


const heapSort = (arr, comparator) => {
    const heap = new Heap(comparator);
    for (const item of arr) {
        heap.add(item);
    }

    return heap.sortedToArray();
};

function solve() {
    const numberOfParticipants = Number(getString());
    const participants = getSplitLines(numberOfParticipants);

    const result = heapSort(participants, compareParticipants);
    printParticipants(result);
}
