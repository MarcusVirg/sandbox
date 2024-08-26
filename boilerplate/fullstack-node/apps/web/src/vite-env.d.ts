/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ENV: 'local' | 'preview' | 'production'
	readonly VITE_APP_URL: string
	readonly VITE_APP_VERSION: string
	readonly VITE_API_URL: string
	readonly VITE_POSTHOG_TOKEN: string
	readonly VITE_SENTRY_DSN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
