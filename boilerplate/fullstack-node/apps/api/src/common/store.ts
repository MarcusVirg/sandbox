import type { DB } from '@/common/db'
import { inventionStoreFactory, type InventionStore } from '@/invention/invention.store'

export interface Store {
	invention: InventionStore
}

export function storeFactory(db: DB): Store {
	return {
		invention: inventionStoreFactory(db)
	}
}
