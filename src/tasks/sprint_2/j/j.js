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
    return string.trim().split(" ");
}

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.currentSize = 0;
    }

    get() {
        if (this.currentSize === 0) {
            return 'error';
        }
        const currentValue = this.head.value;
        this.head = this.head.next;
        this.currentSize -= 1;
        
        return currentValue;
    }

    put(x) {
        const node = new Node(x);
        if (this.currentSize === 0) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
        this.currentSize += 1;
    }

    size() {
        return this.currentSize;
    }
}


const processQueue = (operations) => {
    const result = [];
    const queue = new Queue();
    for (const operation of operations) {
        const [method, arg] = getArray(operation);

        const resultOperation = queue[method](arg);

        if (typeof resultOperation !== 'undefined') {
            result.push(resultOperation);
        }
    }

    return result;
}


function solve() {
    const numberOfOperations = Number(getString());
    const operations = [];
    for (let i = 0; i < numberOfOperations; i++) {
        operations.push(getString());
    }
    const result = processQueue(operations);

    process.stdout.write(`${result.join("\n")}`);
}