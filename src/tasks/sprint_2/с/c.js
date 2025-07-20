class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

const removeNode = (node, idx) => {
    if (idx === 0) {
        return node.next;
    }

    let i = 0;
    let currentNode = node;

    while (i < idx - 1) {
        i++;
        currentNode = currentNode.next;
    }

    if (currentNode.next) {
        currentNode.next = currentNode.next.next;
    }

    return node;
}


function solution(node, idx) {
    return removeNode(node, idx);
}

const printList = (node) => {
    while (node) {
        console.log(node.value);
        node = node.next;
    }
}


function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 2);
    printList(newHead);
    // result is node0 -> node2 -> node3
}

test();