const config = require('../../config.js');

const fetchExercises = async (query) => {
	const url = `https://api.api-ninjas.com/v1/exercises?${new URLSearchParams(query)}`;
	const options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			'X-API-Key': config.apiNinjas.apiKey
		}
	};
	return await fetch(url, options).then((response) => response.json()); 
}

export default async function handler(req, res) {
	res.status(200).json(await fetchExercises(req.query));
}