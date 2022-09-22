import { Container, Heading } from '@chakra-ui/react';
import { 
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip
} from 'recharts';
import HeartRateMonitor from '../components/HeartRateMonitor';
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from 'react';

const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max-min+1) + min);
}

// From Dan
function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export default function HomePage() {
	const [data, setData] = useState([]);
	const [isReady, setIsReady] = useState(false); // This sovles the rechart hydration issue

	useEffect(() => {
		setIsReady(true);
	}, []);

	useInterval(() => {
		const currentDate = new Date();
		const hours = String(currentDate.getHours()).padStart(2, 0);
		const mins = String(currentDate.getMinutes()).padStart(2, 0);
		const secs = String(currentDate.getSeconds()).padStart(2, 0);
		const newData = [...data, {
			name: `${hours}:${mins}:${secs}`,
			hr: getRandomNumberBetween(100, 150)
		}];
		setData(newData);
	}, 5000);

	return (
		<Container mt={5} maxW='container.lg'>
			<Heading mb={5}>Track your fitness</Heading>
			<HeartRateMonitor />
			{isReady ?
				<AreaChart
					id='heart-rate'
					width={730}
					height={250}
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Area type="monotone" dataKey="hr" stroke="#8884d8" fill="#8884d8" />
				</AreaChart>
				: ''
			}
		</Container>
	);
}