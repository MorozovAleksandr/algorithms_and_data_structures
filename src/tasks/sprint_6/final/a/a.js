// https://contest.yandex.ru/contest/25070/run-report/145857924/
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

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    add(edge) {
        this.heap.push(edge);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    heapifyUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent].weight >= this.heap[index].weight) break;

            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    heapifyDown(index) {
        const length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length && this.heap[left].weight > this.heap[largest].weight) {
                largest = left;
            }

            if (right < length && this.heap[right].weight > this.heap[largest].weight) {
                largest = right;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

function addVertex(v, added, notAdded, heap, graph) {
    added.add(v);
    notAdded.delete(v);

    for (const edge of graph[v]) {
        if (notAdded.has(edge.to)) {
            heap.add(edge);
        }
    }
}

function findMaximumSpanningTree(n, graph) {
    const maximumSpanningTree = [];
    const added = new Set();
    const notAdded = new Set(Array.from({length: n}, (_, i) => i + 1));
    const heap = new MaxHeap();

    const startVertex = 1;
    addVertex(startVertex, added, notAdded, heap, graph);

    while (notAdded.size > 0 && !heap.isEmpty()) {
        const edge = heap.extractMax();

        if (notAdded.has(edge.to)) {
            maximumSpanningTree.push(edge);
            addVertex(edge.to, added, notAdded, heap, graph);
        }
    }

    return {maximumSpanningTree, added};
}

function solve() {
    const [countVertex, countEdge] = splitString(getString());
    const edges = getEdges(countEdge);

    const graph = Array.from({length: countVertex + 1}, () => []);

    for (const [vertex1, vertex2, weight] of edges) {
        if (vertex1 !== vertex2) {
            graph[vertex1].push({to: vertex2, weight});
            graph[vertex2].push({to: vertex1, weight});
        }
    }

    const {maximumSpanningTree, added} = findMaximumSpanningTree(countVertex, graph);

    if (added.size !== countVertex) {
        console.log("Oops! I did it again");
    } else {
        const totalWeight = maximumSpanningTree.reduce((sum, edge) => sum + edge.weight, 0);
        console.log(totalWeight);
    }
}