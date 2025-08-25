// https://contest.yandex.ru/contest/24414/run-report/141538659/

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

const splitString = (string) => {
    return string.trim().split(" ").map(toNum);
}

const ERROR_OPERATION = 'None';

class Node {
    constructor(key, value = null, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashTable {
    static ERROR_KEY_NOT_EXIST = 'key does not exist';
    static MAX_SIZE = 100000;

    constructor(maxSize = HashTable.MAX_SIZE) {
        this.table = [];
        this.maxSize = maxSize;
    }

    hash(key) {
        return Math.abs(key) % this.maxSize;
    }

    put(key, value) {
        const index = this.hash(key);
        let node = this.table[index];

        while (node) {
            if (node.key === key) {
                node.value = value;
                return;
            }
            node = node.next;
        }

        this.table[index] = new Node(key, value, this.table[index]);
    }


    get(key) {
        const index = this.hash(key);
        let node = this.table[index];

        while (node) {
            if (node.key === key) {
                return node.value;
            }
            node = node.next;
        }

        throw new Error(HashTable.ERROR_KEY_NOT_EXIST);
    }

    delete(key) {
        const index = this.hash(key);
        let prevNode = null;
        let node = this.table[index];

        while (node) {
            if (node.key === key) {
                const value = node.value;
                if (prevNode === null) {
                    this.table[index] = node.next;
                } else {
                    prevNode.next = node.next;
                }
                return value;
            }

            prevNode = node;
            node = node.next;
        }

        throw new Error(HashTable.ERROR_KEY_NOT_EXIST);
    }
}

const printResult = (result) => console.log(result.join('\n'));

const processRequests = (countRequests) => {
    const result = [];

    const table = new HashTable();
    for (let i = 0; i < countRequests; i++) {
        try {
            const [method, key, value] = splitString(getString());

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

function solve() {
    const countRequests = Number(getString());
    const result = processRequests(countRequests);

    printResult(result);
}