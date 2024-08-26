import config from '@/modules/common/config'

type EncodedData = {
	headers: Record<string, any>
	body: any
}

type Response<T = unknown> =
	| {
			status: number
			data: T
			isError: false
			error: undefined
	  }
	| {
			status: number
			data: undefined
			isError: true
			error: string
	  }
interface HTTP {
	get<T>(url: string, opts?: RequestInit): Promise<Response<T>>
	post<T>(url: string, data: any, opts?: RequestInit): Promise<Response<T>>
	put<T>(url: string, data: any, opts?: RequestInit): Promise<Response<T>>
	patch<T>(url: string, data: any, opts?: RequestInit): Promise<Response<T>>
	delete<T>(url: string, opts?: RequestInit): Promise<Response<T>>
}

export const BASE_URL = config.apiUrl

const http: HTTP = {
	async get(url, opts = {}) {
		const res = await fetch(BASE_URL + url, {
			...opts,
			method: 'GET',
			credentials: 'include'
		})
		if (!res.ok) {
			const err = await parseError(res)
			return { status: res.status, data: undefined, isError: true, error: err }
		}
		const data = await decodeData(res)
		return { status: res.status, data, isError: false }
	},
	async post(url, data, opts = {}) {
		const encoded = encodeData(data)
		const res = await fetch(BASE_URL + url, {
			...opts,
			method: 'POST',
			credentials: 'include',
			headers: {
				...encoded.headers,
				...opts.headers
			},
			body: encoded.body
		})
		if (!res.ok) {
			const err = await parseError(res)
			return { status: res.status, data: undefined, isError: true, error: err }
		}
		const resData = await decodeData(res)
		return { status: res.status, data: resData, isError: false }
	},
	async put(url, data, opts = {}) {
		const encoded = encodeData(data)
		const res = await fetch(BASE_URL + url, {
			...opts,
			method: 'PUT',
			credentials: 'include',
			headers: {
				...encoded.headers,
				...opts.headers
			},
			body: encoded.body
		})
		if (!res.ok) {
			const err = await parseError(res)
			return { status: res.status, data: undefined, isError: true, error: err }
		}
		const resData = await decodeData(res)
		return { status: res.status, data: resData, isError: false }
	},
	async patch(url, data, opts = {}) {
		const encoded = encodeData(data)
		const res = await fetch(BASE_URL + url, {
			...opts,
			method: 'PATCH',
			credentials: 'include',
			headers: {
				...encoded.headers,
				...opts.headers
			},
			body: encoded.body
		})
		if (!res.ok) {
			const err = await parseError(res)
			return { status: res.status, data: undefined, isError: true, error: err }
		}
		const resData = await decodeData(res)
		return { status: res.status, data: resData, isError: false }
	},
	async delete(url, opts = {}) {
		const res = await fetch(BASE_URL + url, {
			...opts,
			method: 'DELETE',
			credentials: 'include'
		})
		if (!res.ok) {
			const err = await parseError(res)
			return { status: res.status, data: undefined, isError: true, error: err }
		}
		const data = await decodeData(res)
		return { status: res.status, data, isError: false }
	}
}

function encodeData(data: any): EncodedData {
	if (data instanceof File) {
		return { headers: {}, body: data }
	}

	return {
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
}

function decodeData(res: globalThis.Response) {
	if (res.status === 204) return

	const contentType = res.headers.get('content-type')
	if (contentType && contentType.includes('application/json')) {
		return res.json()
	}
	return res.text()
}

async function parseError(res: globalThis.Response) {
	try {
		const data = await res.json()
		return data.detail
	} catch (_) {
		return res.statusText
	}
}

export async function authHeaders(token: string) {
	return { Authorization: `Bearer ${token}` }
}

export default http
