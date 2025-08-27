// https://contest.yandex.ru/contest/24414/run-report/141589424/

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
    return string.trim().split(" ");
}

const getSplitLines = (count) => {
    const lines = [];

    for (let i = 0; i < count; i++) {
        lines.push(splitString(getString()));
    }

    return lines;
}

const getSetRequest = (request) => new Set(request);

const MAX_RELEVANT_DOCS = 5;

const buildInvertedIndex = (documents) => {
    const documentsWordFreq = [];
    const invertedIndex = new Map();

    documents.forEach((document, documentIdx) => {
        const wordFreq = new Map();

        document.forEach(word => {
            wordFreq.set(word, (wordFreq.get(word) ?? 0) + 1);

            if (!invertedIndex.has(word)) {
                invertedIndex.set(word, new Set());
            }
            invertedIndex.get(word).add(documentIdx);
        })

        documentsWordFreq.push(wordFreq);
    })

    return {documentsWordFreq, invertedIndex};
}

const isBetterDocument = (a, b) => a[1] > b[1] || (a[1] === b[1] && a[0] < b[0]);

const compareDocs = (a, b) => b[1] - a[1] || a[0] - b[0];

const partialSort = (arr, limit = 5) => {
    if (arr.length < limit) {
        return arr.sort(compareDocs);
    }

    for (let i = 0; i < limit; ++i) {
        let bestIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (isBetterDocument(arr[j], arr[bestIdx])) {
                bestIdx = j;
            }
        }

        if (bestIdx !== i) {
            [arr[i], arr[bestIdx]] = [arr[bestIdx], arr[i]];
        }
    }
    return arr.slice(0, limit).sort(compareDocs);
}


const searchRelevantDocuments = (request, {documentsWordFreq, invertedIndex}, maxDocs) => {
    const scores = new Map();

    for (const word of request) {
        if (invertedIndex.has(word)) {
            for (const docIdx of invertedIndex.get(word)) {
                const wordCount = documentsWordFreq[docIdx].get(word) || 0;
                scores.set(docIdx, (scores.get(docIdx) ?? 0) + wordCount);
            }
        }
    }

    const scoreEntries = Array.from(scores.entries());
    const topEntries = partialSort(scoreEntries, maxDocs);

    return topEntries.map(([docIndex]) => docIndex + 1);
}

const getRelevantDocuments = (documents, requests) => {
    const indexData = buildInvertedIndex(documents);
    const requestsSet = requests.map(getSetRequest);
    const result = [];

    requestsSet.forEach(request => {
        const docs = searchRelevantDocuments(request, indexData, MAX_RELEVANT_DOCS);

        if (docs.length > 0) {
            result.push(docs);
        }
    });

    return result
}

function solve() {
    const countDocuments = Number(getString());
    const documents = getSplitLines(countDocuments);
    const countRequests = Number(getString());
    const requests = getSplitLines(countRequests);

    const result = getRelevantDocuments(documents, requests);

    for (let i = 0; i < result.length; i++) {
        console.log(result[i].join(' '))
    }
}