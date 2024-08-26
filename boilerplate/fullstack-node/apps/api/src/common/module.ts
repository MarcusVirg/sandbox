import type { Store } from '@/common/store'
import { inventionModuleFactory, type InventionModule } from '@/invention/invention.module'

export interface Modules {
	invention: InventionModule
}

export function moduleFactory(store: Store): Modules {
	return {
		invention: inventionModuleFactory(store)
	}
}
