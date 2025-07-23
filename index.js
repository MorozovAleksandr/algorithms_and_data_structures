var mySqrt = function (x) {
    if (x < 2) {
        return x;
    }
    let left = 2;
    let right = x;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;

        if (square === x) {
            return mid;
        }

        if (square > x && ((mid - 1) * (mid - 1)) < x) {
            return mid - 1;
        }

        if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
};

console.log(mySqrt(8));