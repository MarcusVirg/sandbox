import { useQuery } from '@tanstack/react-query'
import http from '@/modules/common/http'
import queryClient from '@/modules/common/queryClient'
import { telemetry } from '@/modules/common/TelemetryProvider'
import type { User } from '@/modules/auth/auth.types'

const USER_KEY = ['user']
const USER_CACHE_TIME = 1000 * 60 * 60 * 4

export async function goToLogin() {
	const { data, isError, error } = await http.get<{ url: string }>('/auth/url')
	if (isError) throw new Error(error)
	window.location.href = data.url
}

export async function authenticate(code: string) {
	const { data, isError, error } = await http.post<User>('/auth/code', { code })
	if (isError) throw new Error(error)
	telemetry.identify(data.id, { email: data.email })
	return data
}

export async function getUser() {
	const { status, data, isError, error } = await http.get<User>('/auth/user')
	if (status === 401) {
		window.location.href = '/auth'
		return {} as User
	}
	if (isError) throw new Error(error)
	return data
}

export async function logout() {
	await http.post('/auth/reset', {})
	telemetry.reset()
	queryClient.clear()
	window.location.href = '/'
}

export function ensureUserData() {
	return queryClient.ensureQueryData({
		queryKey: USER_KEY,
		queryFn: getUser,
		staleTime: USER_CACHE_TIME
	})
}

export function useUser() {
	return useQuery<User>({ queryKey: USER_KEY, queryFn: getUser, staleTime: USER_CACHE_TIME })
}
