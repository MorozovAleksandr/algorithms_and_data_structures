const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line)
});

process.stdin.on('end', solve);


const getString = () => {
    return _inputLines[_curLine++];
}

const splitString = (string) => {
    return string.trim().split(" ").map(Number);
}

const binarySearch = (amounts, price, left, right) => {
    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (amounts[mid] >= price) {
        if (mid === 0 || amounts[mid - 1] < price) {
            return mid;
        }
        return binarySearch(amounts, price, left, mid - 1);
    } else {
        return binarySearch(amounts, price, mid + 1, right);
    }
}

const getDaysToBuy = (countDays, amounts, bikePrice) => {
    const twoBikePrice = bikePrice * 2;

    const firstDayIndex = binarySearch(amounts, bikePrice, 0, countDays);
    const secondDayIndex = binarySearch(amounts, twoBikePrice, firstDayIndex, countDays);
    const firstDay = firstDayIndex > -1 ? firstDayIndex + 1 : firstDayIndex;
    const secondDay = secondDayIndex > -1 ? secondDayIndex + 1 : secondDayIndex;

    return [firstDay, secondDay];
}

function solve() {
    const countDays = Number(getString());
    const amounts = splitString(getString());
    const bikePrice = Number(getString());

    const result = getDaysToBuy(countDays, amounts, bikePrice);

    console.log(result.join(' '));
}