// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

// *Using js built in functions*
// function palindrome(str) {
//     return str.split('').reverse().join('') === str
// }

// Reverses array first and then compares
// function palindrome(str) {
//     return str.split('').reduce((rev, char) =>  rev = char + rev, '') === str
// }

function palindrome(str) {
    return str.split('').every((char, idx) => char === str[str.length - idx - 1])
}

module.exports = palindrome;
