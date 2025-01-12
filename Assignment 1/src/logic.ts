export const splitWords = (input: string): string => {
    const splitArray = input.split('_');
    return splitArray.join(' ');
};

export const concatenateWords = (word1: string, word2: string): string => {
    return word1 + word2;
};

export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
};

export const secretHandshake = (number: number): string[] => {
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
