import pg from 'pg'
import config from '@/common/config'

const pool = new pg.Pool({
	connectionString: config.DATABASE_URL
})

export interface DB {
	_pool: pg.Pool
	query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>
	txn<T = unknown>(statements: string[], params?: unknown[][]): Promise<T[]>
}

export default {
	_pool: pool,
	async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
		const res = await pool.query(sql, params)
		return res.rows as T[]
	},
	async txn<T = unknown>(statements: string[], params: unknown[][] = []): Promise<T[]> {
		if (statements.length !== params.length) {
			throw new Error('Number of statements and parameters do not match')
		}
		// Runs many statements but only returns the result of the last statement
		const client = await pool.connect()
		try {
			await client.query('begin')
			let finalResult: T[] | null = null
			for (let i = 0; i < statements.length; i++) {
				const res = await client.query(statements[i]!, params[i])
				if (i === statements.length - 1) {
					finalResult = res.rows
				}
			}
			await client.query('commit')
			return finalResult!
		} catch (err) {
			await client.query('rollback')
			throw err
		} finally {
			client.release()
		}
	}
} satisfies DB
