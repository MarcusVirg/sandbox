import type { Graph, Node } from './data'

/**
 * Changes the manager of an employee in the org chart
 * If the employee or manager do not exist, the graph is returned unchanged
 * @param graph The org chart graph
 * @param employeeId The id of the employee
 * @param newManagerId The id of the employee's new manager
 * @returns The updated org chart graph
 */
export function changeManager(
	graph: Graph,
	employeeId: Node['id'],
	newManagerId: Node['id']
): Graph {
	const employeeNode = graph.nodes.find((node) => node.id === employeeId)
	const newManagerNode = graph.nodes.find((node) => node.id === newManagerId)
	if (!employeeNode || !newManagerNode) return graph

	const newEdges = [...graph.edges]
	const employeeEdge = newEdges.find((edge) => edge.target === employeeId)
	if (!employeeEdge) return graph

	employeeEdge.source = newManagerId
	return { nodes: graph.nodes, edges: newEdges }
}

/**
 * Finds the common manager of two employees in the org chart
 * @param graph The org chart graph
 * @param employee1Id The id of the first employee
 * @param employee2Id The id of the second employee
 * @returns The id of the common manager or null if either employee does not exist
 */
export function findCommonManager(
	graph: Graph,
	employee1Id: Node['id'],
	employee2Id: Node['id']
): Node | null {
	const employee1 = graph.nodes.find((node) => node.id === employee1Id)
	const employee2 = graph.nodes.find((node) => node.id === employee2Id)
	if (!employee1 || !employee2) return null

	const employee1Egde = graph.edges.find((edge) => edge.target === employee1Id)
	const employee2Edge = graph.edges.find((edge) => edge.target === employee2Id)

	if (!employee1Egde || !employee2Edge) return null

	const employee1Managers = new Set<Node['id']>()
	let managerId: string | undefined = employee1Egde.source
	while (managerId) {
		employee1Managers.add(managerId)
		managerId = graph.edges.find((edge) => edge.target === managerId)?.source
	}

	const employee2Managers = new Set<Node['id']>()
	managerId = employee2Edge.source
	while (managerId) {
		employee2Managers.add(managerId)
		managerId = graph.edges.find((edge) => edge.target === managerId)?.source
	}

	console.log(
		employee1Managers,
		employee2Managers,
		employee1Managers.intersection(employee2Managers)
	)

	const [commonManagerId] = employee1Managers.intersection(employee2Managers)
	if (!commonManagerId) return null

	return graph.nodes.find((node) => node.id === commonManagerId) ?? null
}
