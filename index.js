const binarySearch = (array, element, left = 0, right = array.length - 1) => {
    if (left > right) {
        return -1; // элемент не найден
    }

    const mid = Math.floor((left + right) / 2);
    
    if (array[mid] === element) {
        if (mid !== 0 && array[mid - 1] === element) {
            return binarySearch(array, element, left, mid - 1);
        }
        return mid;
    }

    if (array[mid] < element) {
        return binarySearch(array, element, mid + 1, right);
    } else {
        return binarySearch(array, element, left, mid - 1);
    }
}

const arr = [1, 2, 2, 3, 4, 5, 20, 21, 32, 44, 51];

const findIndex = binarySearch(arr, 2);

console.log(findIndex);