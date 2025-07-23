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

class StackMaxEffective {
    constructor() {
        this.items = [];
        this.maxItems = [];
    }

    push(el) {
        if (this.maxItems.length === 0) {
            this.maxItems.push(el);
        } else {
            if (this.maxItems[this.maxItems.length - 1] <= el) {
                this.maxItems.push(el);
            }
        }
        this.items.push(el);
    }

    pop() {
        if (this.items.length === 0) {
            return 'error';
        }
        if (this.items[this.items.length - 1] === this.maxItems[this.maxItems.length - 1]) {
            this.maxItems.pop();
        }
        this.items.pop();
    }

    top() {
        if (this.items.length === 0) {
            return 'error';
        }

        return this.items[this.items.length - 1];
    }

    get_max() {
        if (this.items.length === 0) {
            return "None";
        }

        return this.maxItems[this.maxItems.length - 1];
    }
}

const processStack = (operations) => {
    const stack = new StackMaxEffective();
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