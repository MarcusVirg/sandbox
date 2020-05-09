// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

// *Convert to string then reverse, only works for positive numbers
// function reverseInt(n) {
//     return Number(n.toString().split('').reduce((rev, char) => rev = char + rev, ''))
// }

function reverseInt(n) {
    const revNum = n.toString().split('').reverse().join('')
    return (parseInt(revNum) * Math.sign(n))
}

module.exports = reverseInt;
