"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayFunctions = arrayFunctions;
function arrayFunctions(req, res) {
    const inputArray = req.body.array;
    // Check if the provided data is an array
    if (!Array.isArray(inputArray)) {
        res.status(400).json({ error: 'Payload must be an array of numbers' });
    }
    // Concat
    const concatResult = inputArray.concat([7, 8, 9]);
    // 2. LastIndexOf
    const lastIndexOfResult = inputArray.lastIndexOf(3); // Finds the last index of 3
    // 3. Push
    const pushResult = [...inputArray];
    pushResult.push(10); // Adds 10 to the end of the array
    // 4. Splice
    const spliceResult = [...inputArray];
    spliceResult.splice(2, 1, 99); // Removes one element at index 2 and replaces it with 99
    // 5. Pop
    const popResult = [...inputArray];
    popResult.pop(); // Removes the last element from the array
    // 6. Slice
    const sliceResult = inputArray.slice(2, 5); // Returns a shallow copy of the portion from index 2 to 5
    // 7. Shift
    const shiftResult = [...inputArray];
    shiftResult.shift(); // Removes the first element from the array
    // 8. Map
    const mapResult = inputArray.map(x => x * 2); // Multiplies each element by 2
    // 9. Filter
    const filterResult = inputArray.filter(x => x % 2 === 0); // Filters out even numbers
    // 10. Unshift
    const unshiftResult = [...inputArray];
    unshiftResult.unshift(0); // Adds 0 to the beginning of the array
    // 11. ForEach
    const forEachResult = [];
    inputArray.forEach(x => forEachResult.push(x + 10)); // Adds 10 to each element using forEach
    // 12. Flat
    const flatResult = [[1, 2], [3, 4], [5]].flat(); // Flattens the nested array
    // 13. Find
    const findResult = inputArray.find(x => x > 3); // Finds the first element greater than 3
    // 14. Join
    const joinResult = inputArray.join('-'); // Joins array elements into a string with "-" separator
    // 15. FindIndex
    const findIndexResult = inputArray.findIndex(x => x === 4); // Finds the index of the first occurrence of 4
    // 16. ToString
    const toStringResult = inputArray.toString(); // Converts array to string
    // 17. Some
    const someResult = inputArray.some(x => x > 5); // Checks if some elements are greater than 5
    // 18. Split (This would be for a string, but we'll split the result of `join`)
    const splitResult = joinResult.split('-'); // Splits the joined string back into an array
    // 19. Replace (This is for strings, we'll replace a number with another in the string form)
    const replaceResult = toStringResult.replace('3', '33'); // Replaces '3' with '33' in the string form
    // 20. Includes
    const includesResult = inputArray.includes(5); // Checks if 5 is in the array
    // 21. IndexOf
    const indexOfResult = inputArray.indexOf(2); // Finds the index of the first occurrence of 2
    res.json({
        originalArray: inputArray,
        concatResult,
        lastIndexOfResult,
        pushResult,
        spliceResult,
        popResult,
        sliceResult,
        shiftResult,
        mapResult,
        filterResult,
        unshiftResult,
        forEachResult,
        flatResult,
        findResult,
        joinResult,
        findIndexResult,
        toStringResult,
        someResult,
        splitResult,
        replaceResult,
        includesResult,
        indexOfResult
    });
}
