function siftDown(heap, idx) {
    const leftIdx = idx * 2;
    const rightIdx = idx * 2 + 1;
   
    if (leftIdx >= heap.length) return idx;

    const largestIdx = (rightIdx < heap.length && heap[rightIdx] > heap[leftIdx]) ? rightIdx : leftIdx;

    if (heap[largestIdx] > heap[idx]) {
        [heap[idx], heap[largestIdx]] = [heap[largestIdx], heap[idx]];

        return siftDown(heap, largestIdx);
    }

    return idx;
}

function test() {
    const sample = [-1, 12, 1, 8, 3, 4, 7];
    console.assert(siftDown(sample, 2) === 5);
}

test();