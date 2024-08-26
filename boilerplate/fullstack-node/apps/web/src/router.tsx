import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { ensureUserData } from '@/modules/auth/auth.protocol'
import BaseLayout from '@/modules/common/BaseLayout'
import AuthPage from '@/modules/auth/AuthPage'
import AppLayout from '@/modules/common/AppLayout'
import InventionsPage from '@/modules/invention/InventionsPage'

const rootRoute = createRootRoute({ component: BaseLayout })

const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/auth',
	component: AuthPage,
	validateSearch: z.object({
		code: z.string().catch('')
	})
})

const appRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: AppLayout,
	beforeLoad: async () => {
		try {
			const user = await ensureUserData()
			return { user }
		} catch (err) {
			console.error('beforeLoad', err)
			// TODO: Fix this, it doesn't resolve the /auth route correctly.
			// throw navigate({ from: '/', to: '/auth', search: { code: '' } })
			// For now just hard reload to the auth route
			window.location.href = '/auth'
		}
	}
})

const inventionsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/inventions',
	component: InventionsPage
})

const routeTree = rootRoute.addChildren([
	authRoute,
	appRoute.addChildren([inventionsRoute])
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export default router
