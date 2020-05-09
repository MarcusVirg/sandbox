const numberOfPairs = (a, k) => {
    if(a.length < 1) {
        return 0
    }
    let pairsCount = 0
    let pairs = new Map()
    a.forEach((elem, idx) => {
        for(let i = idx + 1; i < a.length; i++) {
            if(elem + a[i] === k) {
                if(!pairs.has(a[i]) && !pairs.has(elem)) {
                    ++pairsCount
                }
                pairs.set(elem, a[i])
            }
        }
    });
    return pairsCount
}

console.log(numberOfPairs([1,3,46,1,3,9], 47))

console.log(numberOfPairs([6,6,3,9,3,5,1], 12))