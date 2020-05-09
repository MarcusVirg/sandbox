class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
  }
  addEdge(vertex1, vertex2) {
    // Undirected so add to both arrays, order does not matter
    this.adjacencyList[vertex1].push(vertex2)
    this.adjacencyList[vertex2].push(vertex1)
  }
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      v => v !== vertex2
    )
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      v => v !== vertex1
    )
  }
  removeVertex(vertex) {
    this.adjacencyList[vertex].forEach(adjVertex => {
      this.removeEdge(vertex, adjVertex)
    })
    delete this.adjacencyList[vertex]
  }
  dfsRecursive(start) {
    const visited = {}
    const result = []

    const dfs = vertex => {
      // base case
      if (!vertex) return null

      visited[vertex] = true
      result.push(vertex)

      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          dfs(neighbor)
        }
      })
    }

    dfs(start)
    return result
  }
}

const graph = new Graph()

graph.addVertex('Tokyo')
graph.addVertex('Dallas')
graph.addVertex('Minneapolis')
graph.addVertex('Los Angeles')
graph.addVertex('Singapore')

graph.addEdge('Dallas', 'Minneapolis')
graph.addEdge('Dallas', 'Tokyo')
graph.addEdge('Minneapolis', 'Los Angeles')
graph.addEdge('Minneapolis', 'Singapore')

console.log(graph.adjacencyList)

console.log(graph.dfsRecursive('Minneapolis'))
