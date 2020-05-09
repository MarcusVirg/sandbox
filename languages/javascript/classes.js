class Vehicle {
    constructor({ name, color, model }) {
        this.name = name,
        this.color = color,
        this.model = model
    }

    start() {
        console.log(`${this.name} has started`)
    }

    stop() {
        console.log(`${this.name} has stopped`)
    }
}

class Car extends Vehicle {
    constructor(options) {
        super(options)
        this.year = options.year
    }

    drive() {
        console.log(`${this.name} has started driving`)
    }
}

const honda = new Car({name: 'Betsy', color: 'Black', model: 'Civic', year: 2001})
honda.start()
honda.drive()
honda.stop()
console.log(honda)