// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// *Using js built in functions*
// function reverse(str) {
//     return str.split('').reverse().join('')
// }

function reverse(str) {
    return str.split('').reduce((rev, char) => char + rev, '')
    
    //let reversed = ''
    // *Improved for loop
    // for (let char of str) {
    //     reversed = char + reversed
    // }
    // *Standard for loop
    // for(let i = 0; i < str.length; i++) {
    //     reversed = str[i] + reversed
    // }
    //return reversed
}

module.exports = reverse;
