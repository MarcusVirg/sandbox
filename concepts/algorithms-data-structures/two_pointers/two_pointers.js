const countUniqueValues = arr => {
  if (!arr.length) {
    return 0
  }

  let i = 0
  let j = 1

  for (j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      ++i
      arr[i] = arr[j]
    }
  }

  return i + 1
}

module.exports = countUniqueValues
