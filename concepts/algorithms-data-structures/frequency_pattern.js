// Frequency Counter Pattern
// function same(arr1, arr2) {
//   // Check the length of each array
//   // If they do not match return false
//   if (arr1.length !== arr2.length) return false
//   // Create two objects to keep track of frequency in each array
//   let freqObj1 = {},
//     freqObj2 = {}
//   // count the frequency in arr1 and arr2
//   arr1.forEach(num => {
//     freqObj1[num] = ++freqObj1[num] || 1
//   })
//   arr2.forEach(num => {
//     freqObj2[num] = ++freqObj2[num] || 1
//   })
//   // for each value in the first obj check if the frequency number matches the squared value in the second obj
//   // if there isn't a match return false
//   for (let [key, freq] of Object.entries(freqObj1)) {
//     let num = parseInt(key)
//     if (freqObj2[num * num] != freq) return false
//   }
//   // if they all matched return true
//   return true
// }

// Refactored Frequency Counter Pattern
const same = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false

  const arr1Freq = getFrequency(arr1)
  const arr2Freq = getFrequency(arr2)

  for (let [key, freq] of Object.entries(arr1Freq)) {
    const num = parseInt(key)
    const pred = arr2Freq[num * num] === freq
    if (!pred) return false
  }

  return true
}

const getFrequency = arr => {
  const freqObj = {}
  arr.forEach(item => {
    freqObj[item] = ++freqObj[item] || 1
  })
  return freqObj
}

console.log(same([1, 2, 3], [4, 1, 9])) // true
console.log(same([1, 2, 3], [1, 9])) // false
console.log(same([1, 2, 1], [4, 4, 1])) // false incorrect frequency
console.log(same([], [])) // true or false?
console.log(same([], [1, 4, 9])) // false
