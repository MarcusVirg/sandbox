const cache = {}

function memoize(fn) {
  return (...args) => {
    if (cache[args]) return cache[args]

    const result = fn.apply(this, args)
    cache[args] = result
    return result
  }
}

let fib = n => (n < 2 ? n : fib(n - 1) + fib(n - 2))

fib = memoize(fib)

fib(33)

const fibSum = Object.values(cache).reduce((sum, num) => {
  if (num % 2 === 0) sum += num
  return sum
}, 0)

console.log(fibSum, Object.values(cache))
