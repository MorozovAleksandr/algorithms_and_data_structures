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

const parseRequest = (request) => ({
    method: request[0],
    key: request[1],
    ...(request[2] ? {value: request[2]} : {})
});

class Node {
    constructor(key, value = null, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashTable {
    constructor(maxSize) {
        this.map = [];
        this.size = 0;
        this.maxSize = maxSize;
    }

    static ERROR_KEY_NOT_EXIST = 'key does not exist';
    static SIMPLE_NUMBER = 2654435761;

    hash(key) {
        const positiveKey = Math.abs(key);

        return (positiveKey * HashTable.SIMPLE_NUMBER) % this.maxSize;
    }

    put(key, value) {
        const index = this.hash(key);
        let node = this.map[index];


        while (node) {
            if (node.key === key) {
                node.value = value;
                return;
            }
            node = node.next;
        }

        this.map[index] = new Node(key, value, this.map[index]);
        this.size++;
    }


    get(key) {
        const index = this.hash(key);
        let node = this.map[index];

        if (node) {
            while (node) {
                if (node.key === key) {
                    return node.value;
                }
                node = node.next;
            }
        }

        throw new Error(HashTable.ERROR_KEY_NOT_EXIST);
    }

    delete(key) {
        const index = this.hash(key);
        let prevNode = null;
        let node = this.map[index];

        while (node) {
            if (node.key === key) {
                const value = node.value;
                if (prevNode === null) {
                    this.map[index] = node.next;
                } else {
                    prevNode.next = node.next;
                }
                this.size--;
                return value;
            }

            prevNode = node;
            node = node.next;
        }


        throw new Error(HashTable.ERROR_KEY_NOT_EXIST);
    }
}

const ERROR_OPERATION = 'None';
const MAX_SIZE = 100000;

const processRequests = (requests) => {
    const result = [];

    const table = new HashTable(MAX_SIZE);
    for (const request of requests) {
        try {
            const {method, key, value} = request;

            const resultOperation = table[method](key, value);
            if (resultOperation) {
                result.push(resultOperation);
            }
        } catch (e) {
            result.push(ERROR_OPERATION);
        }
    }

    return result;
}

const printResult = (result) => console.log(result.join('\n'));

function solve() {
    const countRequests = Number(getString());
    const requests = [];
    for (let i = 0; i < countRequests; i++) {
        const arrRequest = splitString(getString());
        const parsedRequest = parseRequest(arrRequest);
        requests.push(parsedRequest);
    }

    const result = processRequests(requests);

    printResult(result);
}