// This pattern keeps track of a subset of data inside a larger set of data.
// Can use this pattern with linear data structures like strings or arrays

const maxSubarraySum = (arr, num) => {
  let maxSum = 0
  let tempSum = 0

  if (num > arr.length) return null

  for (let i = 0; i < num; i++) {
    maxSum += arr[i]
  }
  tempSum = maxSum
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i]
    maxSum = Math.max(maxSum, tempSum)
  }

  return maxSum
}
