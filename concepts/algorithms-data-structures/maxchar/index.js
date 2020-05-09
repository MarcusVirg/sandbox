// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
    let hash = {}
    let max = 0
    let maxChar = ''

    str.split('').forEach(char => {
        hash[char] = hash[char] + 1 || 1
    });

    for(let char in hash) {
        if(hash[char] > max) {
            max = hash[char]
            maxChar = char
        }
    }

    return maxChar
}

module.exports = maxChar;
