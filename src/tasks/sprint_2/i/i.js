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

class Queue {
    constructor(maxLength) {
        this.queue = Array(maxLength).fill(null);
        this.currentSize = 0;
        this.max_n = maxLength
        this.head = 0;
        this.tail = 0;
    }

    push(element) {
        if (this.currentSize === this.max_n) {
            return 'error';
        }
        this.queue[this.tail] = element;
        this.tail = (this.tail + 1) % this.max_n;
        this.currentSize += 1;
    }

    pop() {
        if (this.currentSize === 0) {
            return "None";
        }
        const firstElement = this.queue[this.head];

        this.queue[this.head] = null;
        this.head = (this.head + 1) % this.max_n
        this.currentSize -= 1;
        return firstElement;
    }

    peek() {
        if (this.currentSize === 0) {
            return "None";
        }

        return this.queue[this.head];
    }

    size() {
        return this.currentSize;
    }
}

const processQueue = (maxLengthQueue, operations) => {
    const result = [];
    const queue = new Queue(maxLengthQueue);
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
    const maxLengthQueue = Number(getString());
    const operations = [];
    for (let i = 0; i < numberOfOperations; i++) {
        operations.push(getString());
    }
    const result = processQueue(maxLengthQueue, operations);

    process.stdout.write(`${result.join("\n")}`);
}