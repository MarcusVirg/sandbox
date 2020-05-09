// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

function anagrams(stringA, stringB) {
    return cleanString(stringA) === cleanString(stringB)
}

function cleanString(str) {
    return str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('')
}


// 1st Solution
// function anagrams(stringA, stringB) {
//     const hashA = buildCharMap(stringA)
//     const hashB = buildCharMap(stringB)
//     let anagram = true

//     const aLength = Object.keys(hashA).length
//     const bLength = Object.keys(hashB).length

//     if(aLength >= bLength) {
//         for(let char in hashA) {
//             if(hashA[char] !== hashB[char])
//                 anagram = false
//         }
//     } else {
//         for(let char in hashB) {
//             if(hashA[char] !== hashB[char])
//                 anagram = false
//         }
//     }

//     return anagram
// }

// function buildCharMap(str) {
//     const charMap = {}

//     str.replace(/[^\w]/g, '').toLowerCase().split('').forEach(char => {
//         charMap[char] = charMap[char] + 1 || 1
//     })

//     return charMap
// }

module.exports = anagrams;
