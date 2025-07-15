var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i] += 1;
            return digits;
        }

        if (i === 0 && digits[i] === 9) {
            digits[i] = 0;
            return [1].concat(digits);
        }

        digits[i] = 0;
    }
};

console.log(plusOne([9]));