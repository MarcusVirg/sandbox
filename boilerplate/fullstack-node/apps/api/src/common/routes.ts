import type { Express } from 'express'
import type { Modules } from '@/common/module'
import { inventionRoutesFactory } from '@/invention/invention.routes'

export function initRoutes(app: Express, modules: Modules) {
	app.use('/invention', inventionRoutesFactory(modules))
}
