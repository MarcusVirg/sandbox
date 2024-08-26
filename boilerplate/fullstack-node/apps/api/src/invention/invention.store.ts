import type { Invention } from '@/invention/invention.types'
import type { DB } from '@/common/db'

export interface InventionStore {
	insertInvention(invention: Invention): Promise<Invention>
	getInventions(): Promise<Invention[]>
}

export function inventionStoreFactory(db: DB): InventionStore {
	return {
		async insertInvention(invention: Invention): Promise<Invention> {
			const res = await db.query<Invention>(
				'INSERT INTO invention (name) VALUES ($1) RETURNING *',
				[invention.name]
			)
			return res[0]!
		},
		async getInventions(): Promise<Invention[]> {
			return db.query<Invention>('SELECT * FROM invention')
		}
	}
}
