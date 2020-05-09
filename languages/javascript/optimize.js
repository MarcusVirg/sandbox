const opt = str => {
    let optArr = []
    for(let i = 0; i < str.length; ++i) {
        if(optArr[str.charAt(i)]) {
            optArr[str.charAt(i)]++
        } else {
            optArr[str.charAt(i)] = 1
        }
    }
    return optArr
}

console.log(opt('aaavvsdfbbsdfsdfwuiuyplspdlfnkdfglnkfbjrewfwz'))

const optMap = str => {
    let map = new Map()
    for(let i = 0; i < str.length; i++) {
        let char = str.charAt(i)
        if(map.has(char)) {
            map.set(char, map.get(char) + 1)
        } else {
            map.set(char, 1)
        }
    }
    for(let [key, value] of map.entries()) {
        console.log(`${key}: ${value}\n`)
    }
}
console.time()
optMap('ksndbfjhdsrbfgk111231232342jenrflkdhbfjhdbfgwuefwshdbckdfvwehruiwefbdhjfgbvsroweuhferybfjdshbfwkjehrfiewrfge')
console.timeEnd()