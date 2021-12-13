import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
	// [...params] irá pegar todas as informações da URL após /teste/
	// Ex.: http://localhost:3000/api/teste/1/2/batat%C3%A3o
	console.log(request.query);
	//retorno { params: [ '1', '2', 'batatão' ] }
};
