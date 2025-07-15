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

const getArray = (string) => {
    return string.trim().split(" ").map(item => Number(item));
}

const getWeatherRandomness = (temperatures) => {
    let weatherRandomness = 0;
    const n = temperatures.length;

    for (let i = 0; i < temperatures.length; i++) {
        const tempGreaterPrev = (i === 0) || (temperatures[i] > temperatures[i - 1]);
        const tempGreaterNext = (i === n - 1) || (temperatures[i] > temperatures[i + 1]);

        if (tempGreaterPrev && tempGreaterNext) {
            weatherRandomness++;
        }
    }

    return weatherRandomness;
}

function solve() {
    const length = Number(getString());
    const temperatures = getArray(getString());


    const weatherRandomness = getWeatherRandomness(temperatures);

    process.stdout.write(`${weatherRandomness}`);
}