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

const getEdges = count => {
    const edges = [];

    for (let i = 0; i < count; i++) {
        edges.push(splitString(getString()));
    }

    return edges;
}

const createAdjacencyList = (countVertex, edges) => {
    const adjacencyList = Array.from({length: countVertex + 1}, () => []);

    for (const [from, to] of edges) {
        adjacencyList[from].push(to);
    }

    return adjacencyList
}

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

function solve() {
    const [countVertex, countEdge] = splitString(getString());
    const edges = getEdges(countEdge);
    const adjacencyList = createAdjacencyList(countVertex, edges);
    const colorVertex = new Uint8Array(countVertex + 1);
    const order = [];

    const DFS = (vertex) => {
        colorVertex[vertex] = GRAY;
        const outgoingEdges = adjacencyList[vertex];

        for (let to of outgoingEdges) {
            if (colorVertex[to] === WHITE) {
                DFS(to);
            }
        }

        colorVertex[vertex] = BLACK;
        order.push(vertex);
    }

    for (let i = 1; i <= countVertex; i++) {
        if (colorVertex[i] === WHITE) {
            DFS(i);
        }
    }

    console.log(order.reverse().join(' '));
}