import { Button } from '@chakra-ui/react';
import { useState } from 'react';

const connect = async (props) => {
	const device = await navigator.bluetooth.requestDevice({
		filters: [{ services: ['heart_rate'] }],
		acceptAllDevices: false
	});
	console.log('Starting HR...\n\n');
	const server = await device.gatt.connect();
	const service = await server.getPrimaryService('heart_rate');
	const char = await service.getCharacteristic('heart_rate_measurement');
	char.oncharacteristicvaluechanged = props.onChange;
	char.startNotifications();
	console.log('Started');
	return char;
}

const printHeartRate = (e) => {
	const heartRate = e.target.value.getInt8(1);
	console.log(heartRate);
}

export default function HeartRateMonitor() {
	const [isConnected, setIsConnected] = useState(false);

	const handleClick = (e) => {
		connect({ onChange: printHeartRate }).catch(err => {
			console.error(err);
			setIsConnected(false);
		});
		setIsConnected(true);
	};
	if (!isConnected) {
		return (
			<>
				<Button onClick={handleClick}>Connect HR Monitor</Button>
			</>
		);
	} else {
		return (
			<>
				<div>Chart</div>
			</>
		);
	}
}