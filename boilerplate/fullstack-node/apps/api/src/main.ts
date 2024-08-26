import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from '@/common/config'
import db from '@/common/db'
import { storeFactory } from '@/common/store'
import { moduleFactory } from '@/common/module'
import { initRoutes } from '@/common/routes'

const app = express()

app.use(cors({ origin: config.CLIENT_URL })).use(bodyParser.json())

// App specific routes
const store = storeFactory(db)
const modules = moduleFactory(store)
initRoutes(app, modules)

app.get('/', (_req, res) => {
	res.json({
		status: 'Healthy',
		env: config.ENV,
		appName: config.APP_NAME,
		appVersion: config.APP_VERSION
	})
})

app.listen(config.PORT, () => {
	console.log('Server is running on port', config.PORT)
}).on('error', (error) => {
	// TODO: Send error to error tracking service
	throw new Error(error.message)
})
