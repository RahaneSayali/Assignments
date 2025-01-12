"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretHandshake = exports.isLeapYear = exports.concatenateWords = exports.splitWords = void 0;
const splitWords = (input) => {
    const splitArray = input.split('_');
    return splitArray.join(' ');
};
exports.splitWords = splitWords;
const concatenateWords = (word1, word2) => {
    return word1 + word2;
};
exports.concatenateWords = concatenateWords;
const isLeapYear = (year) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
};
exports.isLeapYear = isLeapYear;
const secretHandshake = (number) => {
    const actions = [
        'wink',
        'double blink',
        'close your eyes',
        'jump'
    ];
    let result = [];
    // Check if the number has reverse flag
    if (number & 16) {
        actions.reverse();
    }
    for (let i = 0; i < 4; i++) {
        if (number & (1 << i)) {
            result.push(actions[i]);
        }
    }
    return result;
};
exports.secretHandshake = secretHandshake;
//# sourceMappingURL=logic.js.map