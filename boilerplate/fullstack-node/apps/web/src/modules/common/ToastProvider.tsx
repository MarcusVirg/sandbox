/* eslint-disable react-refresh/only-export-components */

import { type PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'
import { Button, Card, Heading, Text } from '@radix-ui/themes'
import * as Toast from '@radix-ui/react-toast'

type Toast = {
	type: 'success' | 'error' | 'warning' | 'info'
	title: string
	message: string
}
type ToastParams = Omit<Toast, 'type'>
type ToastContextState = {
	toast: {
		success: (params: ToastParams) => void
		error: (params: ToastParams) => void
		warning: (params: ToastParams) => void
		info: (params: ToastParams) => void
	}
}
const ToastContext = createContext<ToastContextState | null>(null)

function ToastProvider({ children }: PropsWithChildren) {
	const [toast, setToast] = useState<Toast | null>(null)

	const toastContext = useMemo<ToastContextState>(
		() => ({
			toast: {
				success: (params) => setToast({ type: 'success', ...params }),
				error: (params) => setToast({ type: 'error', ...params }),
				warning: (params) => setToast({ type: 'warning', ...params }),
				info: (params) => setToast({ type: 'info', ...params })
			}
		}),
		[setToast]
	)

	const headingColor = useMemo(() => {
		if (!toast) return

		switch (toast.type) {
			case 'success':
				return 'green'
			case 'error':
				return 'red'
			case 'warning':
				return 'yellow'
			case 'info':
				return 'blue'
		}
	}, [toast])

	return (
		<ToastContext.Provider value={toastContext}>
			<Toast.Provider>
				{children}

				<Toast.Root
					className="toast-root"
					open={!!toast}
					onOpenChange={(open) => !open && setToast(null)}
				>
					{toast && (
						<Card className="flex items-center justify-between space-x-4">
							<div>
								<Toast.Title asChild>
									<Heading size="3" color={headingColor}>
										{toast.title}
									</Heading>
								</Toast.Title>
								<Toast.Description asChild>
									<Text>{toast.message}</Text>
								</Toast.Description>
							</div>
							<Toast.Close asChild>
								<Button size="2" color="gray" variant="soft">
									Close
								</Button>
							</Toast.Close>
						</Card>
					)}
				</Toast.Root>
				<Toast.Viewport className="toast-viewport" />
			</Toast.Provider>
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = useContext(ToastContext)
	if (!context) throw new Error('useToast must be used within a ToastProvider')
	return context.toast
}

export default ToastProvider
