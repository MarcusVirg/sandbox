const fib = n => {
    return n < 2 ? n : (fib(n - 1) + fib(n - 2))
    // if(n < 2) {
    //     return n
    // }
    // return fib(n - 1) + fib(n - 2)
}

console.log(fib(20))
console.log(fib(10))