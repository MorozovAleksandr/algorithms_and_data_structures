// https://contest.yandex.ru/contest/22781/run-report/140566877/

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

const parseInputLine = (string) => string.trim().split(" ").map(item => {
    const num = Number(item);
    return isNaN(num) ? item : num;
});

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }
}

const calculateExpression = (leftOperand, rightOperand, operator) => {
    switch (operator) {
        case '+':
            return leftOperand + rightOperand;
        case '-':
            return leftOperand - rightOperand;
        case '*':
            return leftOperand * rightOperand;
        case '/':
            return Math.floor(leftOperand / rightOperand);
    }
}

const executeExpression = (expression) => {
    const stack = new Stack();

    for (const token of expression) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const rightOperand = stack.pop();
            const leftOperand = stack.pop();
            stack.push(calculateExpression(leftOperand, rightOperand, token));
        }
    }

    return stack.pop();
}

function solve() {
    const arrayExpression = parseInputLine(getString());
    const result = executeExpression(arrayExpression);

    console.log(result);
}