import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import TelemetryProvider from '@/modules/common/TelemetryProvider'
import queryClient from '@/modules/common/queryClient'
import ToastProvider from '@/modules/common/ToastProvider'
import router from '@/router'
import '@radix-ui/themes/styles.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TelemetryProvider>
			<Theme accentColor="blue" grayColor="slate">
				<QueryClientProvider client={queryClient}>
					<ToastProvider>
						<RouterProvider router={router} />
					</ToastProvider>
				</QueryClientProvider>
			</Theme>
		</TelemetryProvider>
	</StrictMode>
)
