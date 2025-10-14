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
    return string.trim().split(" ").map(Number);
}

const getRibs = count => {
    const ribs = [];

    for (let i = 0; i < count; i++) {
        ribs.push(splitString(getString()));
    }

    return ribs;
}

const createAdjacencyList = (countVertex, edges) => {
    const adjacencyList = Array.from({length: countVertex + 1}, () => []);

    for (const [from, to] of edges) {
        adjacencyList[from].push(to);
    }

    adjacencyList.forEach(adjacency => adjacency.sort((a, b) => a - b));

    return adjacencyList
}

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

const printVertexTime = (tIn, tOut) => {
    for (let i = 1; i < tIn.length; i++) {
        console.log(`${tIn[i]} ${tOut[i]}`);
    }
}

function solve() {
    const [countVertex, countEdge] = splitString(getString());
    const colorVertex = new Uint8Array(countVertex + 1);
    const tIn = [];
    const tOut = [];
    let time = 0;
    const edges = getRibs(countEdge);
    const adjacencyList = createAdjacencyList(countVertex, edges);

    const stack = [];

    for (let start = 1; start <= countVertex; start++) {
        if (colorVertex[start] !== WHITE) continue;

        stack.push({v: start, i: 0, entered: false});

        while (stack.length > 0) {
            const top = stack[stack.length - 1];

            if (!top.entered) {
                colorVertex[top.v] = GRAY;
                tIn[top.v] = time++;
                top.entered = true;
            }

            const neighbors = adjacencyList[top.v];
            while (top.i < neighbors.length && colorVertex[neighbors[top.i]] !== WHITE) {
                top.i++;
            }

            if (top.i < neighbors.length) {
                const to = neighbors[top.i++];
                stack.push({v: to, i: 0, entered: false});
            } else {
                tOut[top.v] = time++;
                colorVertex[top.v] = BLACK;
                stack.pop();
            }
        }
    }

    printVertexTime(tIn, tOut);
}