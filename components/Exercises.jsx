import { useState } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Select,
	Stack,
	Tag
} from '@chakra-ui/react';

const getExercises = async (query) => {
	const exercises = await fetch(`/api/exercises?${new URLSearchParams(query)}`).then(res => res.json());
	return exercises;
}

const options = {
	type: [
		'cardio',
		'olympic_weightlifting',
		'plyometrics',
		'powerlifting',
		'strength',
		'stretching',
		'strongman'
	],
	muscle: [
		'abdominals',
		'abductors',
		'adductors',
		'biceps',
		'calves',
		'chest',
		'forearms',
		'glutes',
		'hamstrings',
		'lats',
		'lower_back',
		'middle_back',
		'neck',
		'quadriceps',
		'traps',
		'triceps'
	],
	difficulty: [
		'beginner',
		'intermediate',
		'expert'
	]
};

const optionsPlaceholder = {
	type: 'Exercise Type',
	muscle: 'Muscle Group',
	difficulty: 'Difficulty'
};

const difficultyColor = {
	beginner: 'green',
	intermediate: 'orange',
	expert: 'red'
};

const ExerciseItem = ({ exercise }) => {
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box
						fontWeight='semibold'
						fontSize='xl'
						lineHeight='tight'
						flex='1'
						textAlign='left'
					>
						{exercise.name}
						<Badge borderRadius='full' ml={2} px={2} colorScheme={difficultyColor[exercise.difficulty]}>
							{exercise.difficulty}
						</Badge>
						<Badge borderRadius='full' ml={2} px={2}>
							{exercise.muscle}
						</Badge>
						<Badge borderRadius='full' ml={2} px={2}>
							{exercise.type}
						</Badge>
						<Badge borderRadius='full' ml={2} px={2}>
							{exercise.equipment}
						</Badge>
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={3}>
				{exercise.instructions}
			</AccordionPanel>
		</AccordionItem>
	);
}

export default function Exercises() {
	const [query, setQuery] = useState({
		name: '',
		type: '',
		muscle: '',
		difficulty: '',
		offset: 0
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [exercises, setExercises] = useState([]);

	const handleSearchClick = () => {
		const getData = async () => {
			setExercises(await getExercises(query));
		}
		getData().catch(err => setErrorMessage(err.toString()));
	}

	const handleChange = (key) => {
		return (e) => {
			setQuery({
				...query,
				[key]: e.target.value
			});
		}
	}

	const handlePaginationClick = () => {
		const getMoreExercises = async () => {
			const newQuery = {
				...query,
				offset: exercises.length
			}
			const newExercises = await getExercises(newQuery);
			setQuery(newQuery);
			setExercises(exercises.concat(newExercises));
		}
		getMoreExercises().catch(err => setErrorMessage(err.toString()));
	}

	return (
		<>
			<FormControl isInvalid={!!errorMessage}>
				<FormLabel>Search for exercises</FormLabel>
				<Stack direction='row' align='center' pb={3}>
					{Object.keys(options).map(key => {
						return (
							<Select placeholder={optionsPlaceholder[key]} onChange={handleChange(key)} key={key}>
								{options[key].map(value => <option value={value} key={value}>{value}</option>)}
							</Select>
						)
					})}
				</Stack>
				<Stack direction='row' align='center'>
					<Input placeholder='Name of exercise' value={query.name} onChange={(e) => setQuery({...query, name: e.target.value})} />
					<Button onClick={handleSearchClick} colorScheme='blue'>Search</Button>
				</Stack>
				{errorMessage ?
					<FormErrorMessage>{errorMessage}</FormErrorMessage> :
					<FormHelperText>Try searching an exercise (partial name works!)</FormHelperText>
				}
			</FormControl>
			{exercises.length ? <Heading mt={5} as='h2' size='xl'>Exercises</Heading> : ''}
			<Accordion defaultIndex={[0]} allowMultiple>
				{exercises.map((exercise, idx) => {
					return <ExerciseItem exercise={exercise} key={idx} />
				})}
			</Accordion>
			<Button mt={5} onClick={handlePaginationClick}>Get more exercises</Button>
		</>
	);
}