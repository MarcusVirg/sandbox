const electionWinner = votes => {
    let max = 1;
    let table = new Map() // make new map to store votes

    votes.forEach(vote => {
        if(table.has(vote)) {
            table.set(vote, table.get(vote) + 1)
            if(table.get(vote) > max) {
                max = table.get(vote)
            }
        } else {
            table.set(vote, 1)
        }
    })
    const filteredSorted = Array.from(table).filter(candidate => candidate[1] === max).sort()
    return filteredSorted[filteredSorted.length - 1][0]
}

const votes = ['Victor', 'Veronica', 'Ryan', 'Dave', 'Maria', 'Maria', 'Farah', 'Farah', 'Ryan', 'Veronica']

console.log(electionWinner(votes))