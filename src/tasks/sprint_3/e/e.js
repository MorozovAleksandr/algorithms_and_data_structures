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

const splitString = (str) => {
    return str.trim().split(' ').map(Number);
}

const quickSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    const left = [];
    const mid = [];
    const right = [];
    const pivot = arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            mid.push(arr[i]);
        }
    }

    return [...quickSort(left), ...mid, ...quickSort(right)];
}

const getCountHousesCanBuy = (budget, houses) => {
    houses = quickSort(houses);
    let countHousesCanBuy = 0;
    
    for (let i = 0; i < houses.length; i++) {
        if (budget >= houses[i]) {
            countHousesCanBuy++;
            budget -= houses[i];
        } else {
            return countHousesCanBuy;
        }
    }

    return countHousesCanBuy;
}

function solve() {
    const [countOfHouse, budget] = splitString(getString());
    const priceOfHouses = splitString(getString());


    const result = getCountHousesCanBuy(budget, priceOfHouses);
    console.log(result);
}