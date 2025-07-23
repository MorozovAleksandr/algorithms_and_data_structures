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
    return string.trim().split("");
}

class Stack {
    constructor() {
        this.items = [];
    }

    pop() {
        return this.items.pop();
    }

    push(el) {
        this.items.push(el);
    }

    top() {
        return this.items[this.items.length - 1];
    }

    size() {
        return this.items.length;
    }
}

const bracketsPairs = {
    "(": ")",
    "[": "]",
    "{": "}",
}

const isCorrectBracketSeq = (brackets) => {
    const bracketsStack = new Stack();
    for (let i = 0; i < brackets.length; i++) {
        if (bracketsPairs.hasOwnProperty(brackets[i])) {
            bracketsStack.push(brackets[i]);
        } else {
            if (bracketsStack.size() === 0) {
                return false;
            }
            const lastBracket = bracketsStack.pop();
            if (brackets[i] !== bracketsPairs[lastBracket]) {
                return false;
            }
        }
    }

    return !bracketsStack?.size();
}

function solve() {
    const brackets = getArray(getString());
    const result = isCorrectBracketSeq(brackets);

    if (result) {
        console.log("True");
    } else {
        console.log("False");
    }
}