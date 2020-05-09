const hash = require('string-hash')

class DumbTable {
    constructor() {
        this.list = []
    }

    get(x) {
        return this.list[hash(x)]
    }

    set(x,y) {
        this.list[hash(x)] = y
    }
}

let table = new DumbTable()
table.set('a', 1)
table.set('b', 2)

console.time('few records in the table')
table.get('not there')
console.timeEnd('few records in the table')

for(x = 0; x < 1000000; x++) {
    table.set(`element ${x}`, x)
}

console.time('a lot of records in the table')
table.get('not there')
console.timeEnd('a lot of records in the table')