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
        adjacencyList[to].push(from);
    }

    return adjacencyList
}

function solve() {
    const [countVertex, countEdge] = splitString(getString());
    const edges = getEdges(countEdge);
    const adjacencyList = createAdjacencyList(countVertex, edges);
    const color = new Array(countVertex + 1).fill(-1);
    let counter = 1;

    const DFSIterative = (start) => {
        const stack = [start];
        color[start] = counter;

        while (stack.length > 0) {
            const vertex = stack.pop();

            for (const neighbor of adjacencyList[vertex]) {
                if (color[neighbor] === -1) {
                    color[neighbor] = counter;
                    stack.push(neighbor);
                }
            }
        }
    }

    for (let i = 1; i < color.length; i++) {
        if (color[i] === -1) {
            DFSIterative(i);
            counter++;
        }
    }

    const components = {};
    for (let i = 1; i <= countVertex; i++) {
        if (!components[color[i]]) {
            components[color[i]] = [];
        }
        components[color[i]].push(i);
    }

    console.log(Object.values(components).length)

    Object.values(components).forEach(component => {
        console.log(component.join(' '));
    });
}