import { describe, test } from 'node:test'
import { strict as assert } from 'node:assert'
import type { Store } from '@/common/store'
import { inventionModuleFactory } from '@/invention/invention.module'
import { mockInventionStore } from '@/invention/invention.mocks'

describe('Invention Module', () => {
	const inventionModule = inventionModuleFactory({ invention: mockInventionStore } as Store)

	test('creates an invention', async () => {
		assert.equal(mockInventionStore.insertInvention.mock.callCount(), 0)
		await inventionModule.createInvention({
			name: 'Test Invention',
			description: 'Test Description'
		})
		assert.equal(mockInventionStore.insertInvention.mock.callCount(), 1)
	})
})
