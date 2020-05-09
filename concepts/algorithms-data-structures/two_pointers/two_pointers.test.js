const countUniqueValues = require('./two_pointers')

test('finds the number of unique values', () => {
  expect(countUniqueValues([1, 1, 1, 2, 3, 4, 4, 5])).toBe(5)
  expect(countUniqueValues([1, 1, 1, 1, 1, 1])).toBe(1)
  expect(countUniqueValues([])).toBe(0)
  expect(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toBe(7)
})
