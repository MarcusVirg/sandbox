import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: ['.env.local', '.env'] })

export enum ENV {
	LOCAL = 'local',
	PREVIEW = 'preview',
	PRODUCTION = 'production'
}

const configSchema = z.object({
	ENV: z.nativeEnum(ENV),
	APP_NAME: z.string(),
	APP_VERSION: z.string(),
	CLIENT_URL: z.string(),
	PORT: z.number({ coerce: true }),
	DATABASE_URL: z.string()
})

export type Config = z.infer<typeof configSchema>

const config: Config = configSchema.parse({
	ENV: process.env.ENV ?? 'local',
	APP_NAME: process.env.APP_NAME,
	APP_VERSION: process.env.npm_package_version,
	CLIENT_URL: process.env.CLIENT_URL,
	PORT: process.env.PORT ?? '8000',
	DATABASE_URL: process.env.DATABASE_URL
})

export default config
