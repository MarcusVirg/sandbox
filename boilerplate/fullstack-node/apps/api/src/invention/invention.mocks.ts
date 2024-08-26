import { mock } from 'node:test'
import type { InventionStore } from '@/invention/invention.store'

export const mockInventionStore = {
	getInventions: mock.fn(),
	insertInvention: mock.fn()
} satisfies InventionStore
