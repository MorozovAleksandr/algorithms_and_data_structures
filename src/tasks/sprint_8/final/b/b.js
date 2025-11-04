//https://contest.yandex.ru/contest/26133/run-report/147495911/

const _readline = require('readline');
const _reader = _readline.createInterface({ input: process.stdin });
const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

const getString = () => _inputLines[_curLine++];
const getWords = count => {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(getString());
    }
    return words;
};

class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }

    getWordEndings(text, start) {
        const result = [];
        let node = this.root;

        for (let i = start; i < text.length; i++) {
            const char = text[i];
            if (!node.children[char]) break;
            node = node.children[char];
            if (node.isEnd) {
                result.push(i + 1);
            }
        }

        return result;
    }
}

const canBeSegmented = (text, trie) => {
    const n = text.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 0; i < n; i++) {
        if (!dp[i]) continue;
        const endings = trie.getWordEndings(text, i);
        for (let end of endings) {
            dp[end] = true;
        }
    }

    return dp[n];
};

const printResult = result => console.log(result ? 'YES' : 'NO');

function solve() {
    const text = getString();
    const n = Number(getString());
    const words = getWords(n);

    const trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }

    const result = canBeSegmented(text, trie);
    printResult(result);
}
