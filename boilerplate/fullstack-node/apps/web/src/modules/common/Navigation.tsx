import AuthButton from '@/modules/auth/AuthButton'

function Navigation() {
	return (
		<nav className="flex h-16 flex-none items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
			<div className="flex flex-shrink-0 items-center">
				Inventions
			</div>
			<AuthButton />
		</nav>
	)
}

export default Navigation
