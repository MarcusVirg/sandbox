/* eslint-disable react-refresh/only-export-components */

import { type PropsWithChildren, createContext, useContext } from 'react'
import {
	init as initSentry,
	browserTracingIntegration,
	replayIntegration,
	tanstackRouterBrowserTracingIntegration
} from '@sentry/react'
import posthog from 'posthog-js'
import config, { ENV } from '@/modules/common/config'
import router from '@/router'

type Telemetry = {
	__posthog: typeof posthog
	__sentry: ReturnType<typeof initSentry>
	capture: (eventName: string, properties?: Record<string, unknown>) => void
	identify: (userId: string, properties?: Record<string, unknown>) => void
	isIdentified: () => boolean
	reset: () => void
}

const mockTelemetry: Telemetry = {
	__posthog: {} as typeof posthog,
	__sentry: {} as ReturnType<typeof initSentry>,
	capture(eventName, properties) {
		console.info(`Mock Telemetry: capture ${eventName}`, properties)
	},
	identify(userId, properties) {
		console.info(`Mock Telemetry: identify ${userId}`, properties)
	},
	isIdentified() {
		console.info('Mock Telemetry: isIdentified')
		return false
	},
	reset() {
		console.info('Mock Telemetry: reset')
	}
}

export function telemetryFactory(): Telemetry {
	if (config.env === ENV.LOCAL) return mockTelemetry

	posthog.init(config.posthogToken, {
		api_host: 'https://us.i.posthog.com',
		person_profiles: 'identified_only',
		capture_pageview: false
	})
	posthog.register({ env: config.env })

	const sentryClient = initSentry({
		dsn: config.sentryDsn,
		integrations: [
			browserTracingIntegration(),
			replayIntegration(),
			tanstackRouterBrowserTracingIntegration(router)
		],
		// Performance Monitoring
		tracesSampleRate: 1.0, //  Capture 100% of the transactions
		// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
		tracePropagationTargets: ['localhost', config.apiUrl],
		// Session Replay
		replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
		replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
		release: config.appVersion,
		environment: config.env
	})

	let identifiedUserId = ''

	return {
		__posthog: posthog,
		__sentry: sentryClient,
		capture(eventName, properties) {
			posthog.capture(eventName, properties)
		},
		identify(userId, properties) {
			identifiedUserId = userId
			posthog.identify(userId, properties)
		},
		isIdentified() {
			return !!identifiedUserId
		},
		reset() {
			posthog.reset()
		}
	}
}

export const telemetry = telemetryFactory()

const TelemetryContext = createContext<Telemetry | null>(null)

function TelemetryProvider({ children }: PropsWithChildren) {
	return <TelemetryContext.Provider value={telemetry}>{children}</TelemetryContext.Provider>
}

export function useTelemetry() {
	const context = useContext(TelemetryContext)
	if (!context) throw Error('useTelemetry must be used within a TelemetryProvider')
	return context
}

export default TelemetryProvider
