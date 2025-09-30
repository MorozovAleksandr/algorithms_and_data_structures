class CNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

const checkTree = (node) => {
    if (!node) return 0;

    const leftHeight = checkTree(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = checkTree(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
}

function solution(root) {
    return checkTree(root) !== -1;
}

function test() {
    const node9 = new CNode(8);
    const node8 = new CNode(8, null, node9);
    const node7 = new CNode(7);
    const node6 = new CNode(6);
    const node5 = new CNode(5);
    const node4 = new CNode(4, node7, node8);
    const node3 = new CNode(3, node5, node6);
    const node2 = new CNode(2, null, node4);
    const node1 = new CNode(1, node3);
    const node0 = new CNode(1, node1, node2);
    console.log(solution(node0));
}

test();