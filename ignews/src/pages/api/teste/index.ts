import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
	const users = [
		{ id: 1, name: 'Bruno' },
		{ id: 2, name: 'Aline' },
		{ id: 3, name: 'Thiago' },
	];

	return response.json(users);
};
