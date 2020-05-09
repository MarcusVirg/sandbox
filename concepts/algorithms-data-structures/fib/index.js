// --- Directions
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceeding two.
// For example, the sequence
//  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// forms the first ten entries of the fibonacci series.
// Example:
//   fib(4) === 3

let fib = n => n < 2 ? n : (fib(n-1) + fib(n-2))

function memoize(fn) {
    const cache = {}
    return (...args) => {
        if(cache[args])
            return cache[args]
        
        const result = fn.apply(this, args)
        cache[args] = result
        return result
    }
}

fib = memoize(fib)

// Even shorter solution, one line, thanks Javascript
// const fib = n => n < 2 ? n : (fib(n-1) + fib(n-2))

// Short ternary solution
// function fib(n) {
//     return n < 2 ? n : (fib(n-1) + fib(n-2))
// }

// Normal recursive solution - O(n ^ 2) exponential runtime... terrible runtime time to use memoization
// function fib(n) {
//     if (n < 2)
//         return n
//     else
//         return fib(n-1) + fib(n-2)
// }

// Normal iterative solution - O(n) linear runtime
// function fib(n) {
//     const result = [0, 1]

//     for(let i = 2; i <= n; i++) {
//         const a = result[i - 1]
//         const b = result[i - 2]
//         result.push(a + b)
//     }

//     return result[n]
// }

module.exports = fib;
