import { Container } from '@chakra-ui/react';
import HeartRateMonitor from '../components/HeartRateMonitor';

export default function HomePage() {
	return (
		<Container mt={5} maxW='container.lg'>
			<HeartRateMonitor />
		</Container>
	);
}