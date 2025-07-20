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

class StackMax {
    constructor() {
        this.items = [];
    }

    push(el) {
        this.items.push(el);
    }

    pop() {
        if (this.items.length === 0) {
            return 'error';
        }

        this.items.pop();
    }

    get_max() {
        if (this.items.length === 0) {
            return "None";
        }
        let max = this.items[0];
        for (let i = 1; i < this.items.length; i++) {
            if (max < this.items[i]) {
                max = this.items[i];
            }
        }


        return max;
    }
}

const processStack = (operations) => {
    const stack = new StackMax();
    const result = [];

    for (let i = 0; i < operations.length; i++) {
        const [method, arg] = getArray(operations[i]);
        if (arg !== undefined) {
            stack[method](Number(arg));
        } else {
            const methodResult = stack[method]();
            if (methodResult !== undefined) {
                result.push(methodResult);
            }
        }
    }

    return result;
}

function solve() {
    const numberOfOperation = Number(getString());
    const operations = [];
    for (let i = 0; i < numberOfOperation; i++) {
        operations.push(getString());
    }

    const result = processStack(operations);
    console.log(`${result.join("\n")}`);
}