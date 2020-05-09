const minPower = p => {
    let final = p.reduce((power, enemy) => {
        return power + enemy
    }, Math.abs(Math.min(p)))
    return Math.abs(final)
}

console.log(minPower([-2,3,1,-5]))