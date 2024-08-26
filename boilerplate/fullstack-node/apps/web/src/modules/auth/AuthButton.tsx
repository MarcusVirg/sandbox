import { logout, useUser } from '@/modules/auth/auth.protocol'
import { Avatar, DropdownMenu, Flex, Heading, Text } from '@radix-ui/themes'

function initials(name: string) {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
}

function AuthButton() {
	const { isLoading, isError, data: user } = useUser()
	if (isLoading || isError || !user) return null

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar src={user.avatar_url} fallback={initials(user.name)} radius="large" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<Flex direction="column" px="4" py="2">
					<Heading size="4">{user.name}</Heading>
					<Text>{user.email}</Text>
				</Flex>
				{/* <DropdownMenu.Item onSelect={() => console.log('Settings')}>Settings</DropdownMenu.Item> */}
				<DropdownMenu.Separator />
				<DropdownMenu.Item onSelect={() => void logout()}>Sign out</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}

export default AuthButton
