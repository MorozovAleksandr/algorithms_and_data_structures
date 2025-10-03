// https://contest.yandex.ru/contest/24810/run-report/143837769/

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

const findNode = (root, key, parent = null) => {
    if (!root) return null;

    if (root.value === key) return {parent, nodeToRemove: root};

    const goLeft = key < root.value;
    return findNode(goLeft ? root.left : root.right, key, root);
};

const findMinNode = (node) => {
    let current = node;
    while (current && current.left) {
        current = current.left;
    }
    return current;
}

const removeNode = (root, node, parent) => {
    const child = node.left || node.right || null;

    if (!parent) {
        return child;
    }

    if (parent.left === node) {
        parent.left = child;
    } else {
        parent.right = child;
    }

    return root;
}

const removeNodeWithTwoChildren = (root, node) => {
    const successor = findMinNode(node.right);
    const successorValue = successor.value;

    root = remove(root, successorValue);
    node.value = successorValue;

    return root;
}

function remove(root, key) {
    const nodeData = findNode(root, key);

    if (!nodeData) {
        return root;
    }

    const {nodeToRemove, parent} = nodeData;

    // лист или один чилд
    if (!nodeToRemove.left || !nodeToRemove.right) {
        return removeNode(root, nodeToRemove, parent);
    }

    // два чалда
    return removeNodeWithTwoChildren(root, nodeToRemove);
}

function test() {
    const node1 = new Node(2, null, null);
    const node2 = new Node(3, node1, null);
    const node3 = new Node(1, null, node2);
    const node4 = new Node(6, null, null);
    const node5 = new Node(8, node4, null);
    const node6 = new Node(10, node5, null);
    const node7 = new Node(5, node3, node6);
    const newHead = remove(node7, 10);
    console.assert(newHead.value === 5);
    console.assert(newHead.right === node5);
    console.assert(newHead.right.value === 8);
}

test();