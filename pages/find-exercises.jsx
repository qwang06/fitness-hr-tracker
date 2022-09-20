import { Container } from '@chakra-ui/react';
import Exercises from '../components/Exercises';

export default function FindExercises() {
	return (
		<Container mt={5} maxW='container.lg'>
			<Exercises />
		</Container>
	);
}