import type { Store } from '@/common/store'
import type { Invention } from '@/invention/invention.types'

export interface InventionModule {
	createInvention(invention: Invention): Promise<Invention>
	getInventions(): Promise<Invention[]>
}

export function inventionModuleFactory(store: Store): InventionModule {
	return {
		createInvention(invention: Invention) {
			return store.invention.insertInvention(invention)
		},
		getInventions() {
			return store.invention.getInventions()
		}
	}
}
