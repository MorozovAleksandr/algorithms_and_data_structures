class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

const getIndexByValue = (head, value) => {
    let i = 0;
    let currentNode = head;

    while (currentNode && currentNode.value !== value) {
        currentNode = currentNode.next;
        i++;
    }


    return currentNode?.value === value ? i : -1;
}

function solution(node, elem) {
    return getIndexByValue(node, elem);
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var idx = solution(node0, "qwe");
    console.log(idx);
    // result is idx === 2
}

test();