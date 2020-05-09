class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    if (!this.adjacencyList(vertex)) {
      this.adjacencyList[vertex] = []
    }
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1]
  }
}
