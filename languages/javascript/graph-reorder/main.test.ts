import { describe, test } from 'node:test'
import { strict as assert } from 'node:assert'
import { orgChart, type Graph } from './data'
import { changeManager, findCommonManager } from './main'

describe('Org Chart (Move Manager)', () => {
	test('moves an employee to a new manager', async () => {
		const orgChartCopy = JSON.parse(JSON.stringify(orgChart)) as Graph

		assert.equal(orgChartCopy.edges.find((edge) => edge.target === 'wkInt')?.source, '45vxh')
		const updatedOrgChart = changeManager(orgChartCopy, 'wkInt', 'anK5x')
		assert.equal(updatedOrgChart.edges.find((edge) => edge.target === 'wkInt')?.source, 'anK5x')
	})

	test('returns same graph when moving an unknown employee to a new manager', async () => {
		const orgChartCopy = JSON.parse(JSON.stringify(orgChart)) as Graph

		const updatedOrgChart = changeManager(orgChartCopy, 'tg342', 'anK5x')
		assert.equal(JSON.stringify(orgChart), JSON.stringify(updatedOrgChart))
	})

	test('returns same graph when moving an employee to an unknown manager', async () => {
		const orgChartCopy = JSON.parse(JSON.stringify(orgChart)) as Graph

		const updatedOrgChart = changeManager(orgChartCopy, 'wkInt', 'tg345')
		assert.equal(JSON.stringify(orgChart), JSON.stringify(updatedOrgChart))
	})
})

describe('Org Chart (Common Manager)', () => {
	test('finds the common manager between two employees', async () => {
		const orgChartCopy = JSON.parse(JSON.stringify(orgChart)) as Graph

		const manager1 = findCommonManager(orgChartCopy, '5KDBa', 'wLJcL')
		assert.notEqual(manager1, null)
		assert.equal(manager1!.id, 'ptABI')

		const manager2 = findCommonManager(orgChartCopy, 'OXCoq', 'VxIOc')
		assert.notEqual(manager2, null)
		assert.equal(manager2!.id, 'f01a2')

		const manager3 = findCommonManager(orgChartCopy, 'OXCoq', 'DeIMC')
		assert.notEqual(manager3, null)
		assert.equal(manager3!.id, '9e1uX')
	})

	test('returns null when an employee does not exist', async () => {
		const orgChartCopy = JSON.parse(JSON.stringify(orgChart)) as Graph

		const manager = findCommonManager(orgChartCopy, 'tg342', 'wLJcL')
		assert.equal(manager, null)
	})
})
