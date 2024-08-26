import { useEffect } from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'
import { useTelemetry } from '@/modules/common/TelemetryProvider'

function BaseLayout() {
	const telemetry = useTelemetry()
	const location = useLocation()

	useEffect(() => {
		telemetry.capture('$pageview')
	}, [telemetry, location])

	return <Outlet />
}

export default BaseLayout
