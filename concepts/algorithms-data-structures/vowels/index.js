// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
//   vowels('Hi There!') --> 3
//   vowels('Why do you ask?') --> 4
//   vowels('Why?') --> 0

// Regex solution
function vowels(str) {
    // regex matches on any string inside the brackets
    // g checks entire string and doesn't stop on the first occurence of match
    // i stands for case insensitive
    // match() will return the number of matches or null for no matches
    const matches = str.match(/[aeiou]/gi)
    return matches ? matches.length : 0
}

// Iterative Solution
// function vowels(str) {
//     const vowels = ['a', 'e', 'i', 'o', 'u']
//     return str.toLowerCase().split('').reduce((num, char) => {
//         if(vowels.includes(char)) {
//             return ++num
//         } else
//             return num
//     }, 0)
// }

module.exports = vowels;
