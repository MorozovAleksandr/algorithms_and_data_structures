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

const getLessonTime = (lessons) => {
    const lessonsTime = [];

    for (let i = 0; i < lessons; i++) {
        lessonsTime.push(splitString(getString()));
    }

    return lessonsTime;
}


function solve() {
    const lessons = Number(getString());
    const lessonTime = getLessonTime(lessons);
    lessonTime.sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        return a[1] - b[1];
    });

    const meets = [];
    let lastEnd = 0;

    for (const [start, end] of lessonTime) {
        if (start >= lastEnd) {
            meets.push([start, end]);
            lastEnd = end;
        }
    }

    console.log(meets.length);
    for (let i = 0; i < meets.length; i++) {
        console.log(meets[i].join(' '));
    }
}