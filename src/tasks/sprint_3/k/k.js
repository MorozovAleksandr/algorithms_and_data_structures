function merge_sort(arr, left, right) {
    if (right - left <= 1) {
        return;
    }

    const mid = Math.floor((left + right) / 2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid, right);
    
    const mergedArr = merge(arr, left, mid, right);

    for (let i = 0; i < mergedArr.length; i++) {
        arr[left + i] = mergedArr[i];
    }
}

function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid);
    const rightArr = arr.slice(mid, right);
    const result = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        if (leftArr[leftIndex] <= rightArr[rightIndex]) {
            result.push(leftArr[leftIndex]);
            leftIndex++;
        } else {
            result.push(rightArr[rightIndex]);
            rightIndex++;
        }
    }

    while (leftIndex < leftArr.length) {
        result.push(leftArr[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < rightArr.length) {
        result.push(rightArr[rightIndex]);
        rightIndex++;
    }


    return result;
}

function test() {
    const a = [1, 4, 9, 2, 10, 11];
    const b = merge(a, 0, 3, 6);
    let expected = [1, 2, 4, 9, 10, 11];

    const c = [1, 4, 2, 10, 1, 2];
    merge_sort(c, 0, 6)
    expected = [1, 1, 2, 2, 4, 10];
}


test();