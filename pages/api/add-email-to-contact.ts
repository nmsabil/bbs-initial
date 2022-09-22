import client from '@sendgrid/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { ClientRequest } from '@sendgrid/client/src/request';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { email } = req.body;

	if (req.method !== 'PUT') return res.status(400).json({ message: 'wrong method' });

	try {
		client.setApiKey(process.env.SENDGRID_API_KEY);
		if (!email) throw { message: 'Email is missing' };

		const request: ClientRequest = {
			url: '/v3/marketing/contacts',
			method: 'PUT',
			body: {
				contacts: [
					{
						email: email,
					},
				],
			},
		};

		return client
			.request(request)
			.then(() => {
				return res.status(200).json({ status: 'Success', data: req.body });
			})
			.catch((err) => {
				throw new Error(err);
			});
	} catch (error) {
		// console.log(error);
		if (error.response) console.log('response : ', error.response);
		return res.status(500).json({ status: 'Failed', error: error });
	}
}
