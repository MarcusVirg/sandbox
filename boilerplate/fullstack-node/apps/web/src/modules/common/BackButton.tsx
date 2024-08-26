import { useRouter } from '@tanstack/react-router'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

function BackButton() {
	const { history } = useRouter()

	return (
		<Button size="3" variant="ghost" onClick={() => history.back()}>
			<ChevronLeftIcon /> Back
		</Button>
	)
}

export default BackButton
