import { Router, type Request, type Response } from 'express'
import type { Modules } from '@/common/module'

export function inventionRoutesFactory(modules: Modules): Router {
	const router = Router()

	router.get('/', async (_: Request, res: Response) => {
		const inventions = await modules.invention.getInventions()
		res.json(inventions)
	})

	return router
}
