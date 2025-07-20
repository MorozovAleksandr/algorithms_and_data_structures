if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
        constructor(value = null, next = null) {
            this.value = value;
            this.next = next;
        }
    }
}

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

function solution(node) {
    while (node) {
        console.log(node.value);
        node = node.next;
    }
}

function test() {
    const node3 = new Node("node3");
    const node2 = new Node("node2", node3);
    const node1 = new Node("node1", node2);
    const node0 = new Node("node0", node1);
    solution(node0);
    /*
    Output is:
    node0
    node1
    node2
    node3
    */
}

test();