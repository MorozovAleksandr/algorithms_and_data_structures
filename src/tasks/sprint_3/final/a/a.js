// https://contest.yandex.ru/contest/23815/run-report/140819235/

function brokenSearch(arr, target, left = 0, right = arr.length - 1) {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;

        const leftIsSorted = arr[left] <= arr[mid];
        const isTargetInLeftSegment = arr[left] <= target && target < arr[mid];
        const isTargetInRightSegment = arr[mid] < target && target <= arr[right];

        if (leftIsSorted) {
            if (isTargetInLeftSegment) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (isTargetInRightSegment) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 6, 12];
    console.log(brokenSearch(arr, 6));
}

test();