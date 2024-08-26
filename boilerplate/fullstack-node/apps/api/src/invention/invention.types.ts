import { z } from 'zod'

export type Invention = {
	name: string
	description: string
}

// Contracts

export const createInvention = z.object({
	/** Name of the invention */
	name: z.string(),
	/** Description of the invention */
	description: z.string()
})

export type CreateInventionContract = z.infer<typeof createInvention>
