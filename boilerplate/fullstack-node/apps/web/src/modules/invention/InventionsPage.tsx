import { useInventions } from '@/modules/invention/invention.protocol'
import { Container, Heading, Skeleton } from '@radix-ui/themes'

function InventionsPage() {
	const { isPending, error, data: inventions } = useInventions()

	if (isPending)
		return (
			<Container className="p-8">
				<Heading mb="4">Your Inventions</Heading>
				<div className="flex flex-wrap">
					{Array(5)
						.fill(null)
						.map((_, i) => (
							<Skeleton key={i} className="m-2 h-80 w-80" />
						))}
				</div>
			</Container>
		)
	if (error) return <Container className="p-8">Error loading inventions: {error.message}</Container>

	return (
		<Container className="p-8">
			<Heading mb="4">Your Inventions</Heading>
			<div className="flex flex-wrap">
				{inventions
					.map((invention) => (
						<p>{invention.name}</p>
					))}
			</div>
		</Container>
	)
}

export default InventionsPage
