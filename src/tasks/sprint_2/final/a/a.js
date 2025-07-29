// https://contest.yandex.ru/contest/22781/run-report/140565609/

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

const readOperations = (countOperations) => {
    const operations = [];
    for (let i = 0; i < countOperations; i++) {
        operations.push(getString());
    }

    return operations;
}

class Deque {
    constructor(maxSize) {
        this.deque = Array(maxSize);
        this.maxSize = maxSize;
        this.size = 0;
        this.head = 0;
        this.tail = 0;
    }

    push_back(element) {
        if (this.isFull()) return "error";

        this.deque[this.tail] = element;
        this.tail = (this.tail + 1) % this.maxSize;
        this.size++;
    }

    push_front(element) {
        if (this.isFull()) return "error";

        this.head = (this.head - 1 + this.maxSize) % this.maxSize;
        this.deque[this.head] = element;
        this.size++;
    }

    pop_back() {
        if (this.isEmpty()) return "error";

        this.tail = (this.tail - 1 + this.maxSize) % this.maxSize;
        const value = this.deque[this.tail];
        this.size--;

        return value;
    }

    pop_front() {
        if (this.isEmpty()) return "error";

        const value = this.deque[this.head];
        this.head = (this.head + 1) % this.maxSize;
        this.size--;

        return value;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.maxSize;
    }
}

const executeDequeOperations = (operations, dequeSize) => {
    const result = [];
    const deque = new Deque(dequeSize);
    for (const operation of operations) {
        const [method, arg] = splitString(operation);

        const operationResult = deque[method](arg);

        if (typeof operationResult !== 'undefined') {
            result.push(operationResult);
        }
    }

    return result;
}

function solve() {
    const countOperations = Number(getString());
    const dequeSize = Number(getString());
    const operations = readOperations(countOperations);

    const result = executeDequeOperations(operations, dequeSize);

    console.log(result.join("\n"));
}