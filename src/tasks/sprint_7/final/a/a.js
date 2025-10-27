// https://contest.yandex.ru/contest/25597/run-report/146748325/
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

const initFirstRow = (targetLength) => {
    const row = [];
    for (let index = 0; index <= targetLength; index++) {
        row[index] = index;
    }
    return row;
};

const calculateEditCost = (source, target, sourcePos, targetPos, previousRow, currentRow) => {
    const symbolsAreEqual = source[sourcePos - 1] === target[targetPos - 1];
    const substitutionCost = symbolsAreEqual ? 0 : 1;

    return Math.min(
        previousRow[targetPos] + 1,  // удаление
        currentRow[targetPos - 1] + 1, // вставка
        previousRow[targetPos - 1] + substitutionCost // замена
    );
};

const getLevenshteinDistance = (source, target) => {
    if (target.length > source.length) [source, target] = [target, source];

    const sourceLength = source.length;
    const targetLength = target.length;

    let previousRow = initFirstRow(targetLength);

    for (let sourceIndex = 1; sourceIndex <= sourceLength; sourceIndex++) {
        const currentRow = new Array(targetLength + 1);
        currentRow[0] = sourceIndex;

        for (let targetIndex = 1; targetIndex <= targetLength; targetIndex++) {
            currentRow[targetIndex] = calculateEditCost(
                source,
                target,
                sourceIndex,
                targetIndex,
                previousRow,
                currentRow
            );
        }

        previousRow = currentRow;
    }

    return previousRow[targetLength];
};

function solve() {
    const firstString = getString().trim();
    const secondString = getString().trim();

    const distance = getLevenshteinDistance(firstString, secondString);
    console.log(distance);
}