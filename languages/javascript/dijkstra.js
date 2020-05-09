// graph to find shortest path for, each key is a node and the nested keys are it's neighbors with their weight as an integer
const graph = {
    start: {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
}

// // keep track of the lowest cost to get to each node
// const costs = {
//     A: 5,
//     B: 2,
//     finish: Infinity
// }

// // Keeps track of the path/parent node of each node
// const parents = {
//     A: 'start', 
//     B: 'start', 
//     finish: null
// }

// // keeps track of visited notes
// const processed = ['start', 'A', 'B'];

// given the costs and processed nodes, find the cheapest node that has not been processed
const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (!lowest || costs[node] < costs[lowest]) {
            if(!processed.includes(node)) {
                lowest = node
            }
        }
        return lowest
    }, null)
}

const dikstra = graph => {
    const costs = Object.assign({finish: Infinity}, graph.start)

    const parents = {finish: null}

    for(let child in graph.start) {
        parents[child] = 'start'
    }
}