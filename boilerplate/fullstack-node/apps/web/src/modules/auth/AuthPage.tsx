import { useEffect } from 'react'
import { Flex, Spinner } from '@radix-ui/themes'
import { useSearch, useNavigate } from '@tanstack/react-router'
import { authenticate, goToLogin } from '@/modules/auth/auth.protocol'

function AuthPage() {
	const navigate = useNavigate()
	const params = useSearch({ from: '/auth' })

	useEffect(() => {
		async function auth(code: string) {
			await authenticate(code)
			await navigate({ to: '/' })
		}

		if (params.code) void auth(params.code)
		else void goToLogin()
	}, [params, navigate])

	return (
		<Flex width="100%" height="100%" align="center" justify="center">
			<Spinner />
		</Flex>
	)
}

export default AuthPage
