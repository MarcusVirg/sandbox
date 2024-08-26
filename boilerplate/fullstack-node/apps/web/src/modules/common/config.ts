import { z } from 'zod'

export enum ENV {
	LOCAL = 'local',
	PREVIEW = 'preview',
	PRODUCTION = 'production'
}

const configSchema = z.object({
	env: z.nativeEnum(ENV),
	appName: z.string(),
	appVersion: z.string(),
	appUrl: z.string(),
	apiUrl: z.string(),
	posthogToken: z.string(),
	sentryDsn: z.string()
})

export type Config = z.infer<typeof configSchema>

const config: Config = configSchema.parse({
	env: import.meta.env.VITE_ENV || ENV.LOCAL,
	appName: 'app-name',
	appVersion: import.meta.env.VITE_APP_VERSION,
	appUrl: import.meta.env.VITE_APP_URL,
	apiUrl: import.meta.env.VITE_API_URL,
	posthogToken: import.meta.env.VITE_POSTHOG_TOKEN,
	sentryDsn: import.meta.env.VITE_SENTRY_DSN
})

export default config
