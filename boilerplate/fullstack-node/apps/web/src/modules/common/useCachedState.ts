import { useState } from 'react'

function useCachedState<T = unknown>(initialValue: T, cachekey: string) {
	const [state, setState] = useState<T>(() => {
		const cachedState = localStorage.getItem(cachekey)
		if (cachedState) return JSON.parse(cachedState) as T

		return JSON.parse(JSON.stringify(initialValue)) as T
	})

	const setFn = (state: T) => {
		localStorage.setItem(cachekey, JSON.stringify(state))
		setState(state)
	}

	return [state, setFn] as const
}

export default useCachedState
