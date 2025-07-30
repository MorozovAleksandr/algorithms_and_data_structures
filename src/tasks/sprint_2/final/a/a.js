// https://contest.yandex.ru/contest/22781/run-report/140593865/

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

const mapMethodDequeNames = {
    push_back: "pushBack",
    push_front: "pushFront",
    pop_back: "popBack",
    pop_front: "popFront"
}

const ERROR_MESSAGE = 'error';

class Deque {
    constructor(maxSize) {
        this.deque = [];
        this.deque.length = maxSize;
        this.maxSize = maxSize;
        this.size = 0;
        this.head = 0;
        this.tail = 0;
    }

    static ERROR_DEQUE_IS_FULL = 'deque is full';
    static ERROR_DEQUE_IS_EMPTY = 'deque is empty';

    #moveIterator(previousIteratorValue, step) {
        return (previousIteratorValue + step + this.maxSize) % this.maxSize;
    }

    pushBack(element) {
        if (this.isFull()) throw new Error(Deque.ERROR_DEQUE_IS_FULL);

        this.deque[this.tail] = Number(element);
        this.tail = this.#moveIterator(this.tail, 1);
        this.size++;
    }

    pushFront(element) {
        if (this.isFull()) throw new Error(Deque.ERROR_DEQUE_IS_FULL);

        this.head = this.#moveIterator(this.head, -1);
        this.deque[this.head] = Number(element);
        this.size++;
    }

    popBack() {
        if (this.isEmpty()) throw new Error(Deque.ERROR_DEQUE_IS_EMPTY);

        this.tail = this.#moveIterator(this.tail, -1);
        const value = this.deque[this.tail];
        this.size--;

        return value;
    }

    popFront() {
        if (this.isEmpty()) throw new Error(Deque.ERROR_DEQUE_IS_EMPTY);

        const value = this.deque[this.head];
        this.head = this.#moveIterator(this.head, 1);
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
        const methodName = mapMethodDequeNames[method];
        try {
            const operationResult = deque[methodName](arg);

            if (typeof operationResult === 'number') {
                result.push(operationResult);
            }
        } catch (e) {
            result.push(ERROR_MESSAGE);
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