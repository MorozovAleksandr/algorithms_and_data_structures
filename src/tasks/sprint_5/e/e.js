class CNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}


const isValidBST = (root, min = -Infinity, max = Infinity) => {
    if (root.value <= min || root.value >= max) {
        return false;
    }

    if (root.left && !isValidBST(root.left, min, root.value)) {
        return false;
    }

    return !(root.right && !isValidBST(root.right, root.value, max));
}

function solution(root) {
    return isValidBST(root);
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5));
    node4.value = 5;
    console.assert(!solution(node5));
}

test();