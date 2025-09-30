function siftUp(heap, idx) {
    if (idx === 1) {
        return idx;
    }

    const parentIdx = Math.floor(idx / 2);

    if (heap[idx] > heap[parentIdx]) {
        [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
        return siftUp(heap, parentIdx);
    }

    return idx;
}

function test() {
    const sample = [-1, 12, 6, 8, 3, 15, 7];
    console.assert(siftUp(sample, 5) === 1);
}

test();