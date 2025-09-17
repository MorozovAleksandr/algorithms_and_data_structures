class CNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const binaryTreeFindMax = (root) => {
    const maxLeft = root.left ? binaryTreeFindMax(root.left) : -Infinity;
    const maxRight = root.right ? binaryTreeFindMax(root.right) : -Infinity;

    return Math.max(root.value, maxLeft, maxRight);
}

function solution(root) {
    return binaryTreeFindMax(root);
}

function test() {
    var node1 = new CNode(312);
    var node2 = new CNode(-5);
    var node3 = new CNode(311);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(2);
    node4.left = node3;
    console.assert(solution(node4) === 3);
}

test();