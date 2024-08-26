import { useEffect } from 'react'
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import Navigation from '@/modules/common/Navigation'

function AppLayout() {
	const router = useRouterState()
	const navigate = useNavigate()

	useEffect(() => {
		if (router.location.pathname === '/') {
			void navigate({ to: '/inventions' })
		}
	}, [router, navigate])

	return (
		<div className="flex h-full w-full flex-col">
			<Navigation />
			<main className="flex-1 overflow-auto">
				<Outlet />
			</main>
		</div>
	)
}

export default AppLayout
