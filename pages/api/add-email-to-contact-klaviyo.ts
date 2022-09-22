import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { email } = req.body;
	if (req.method !== 'PUT') return res.status(400).json({ message: 'wrong method' });
	const apiKey = process.env.KLAVIYO_KEY;
	const listId = process.env.KLAVIYO_LIST;

	const data =  {
		profiles: [
			{email: email}
		]
	}

	return axios.post(`https://a.klaviyo.com/api/v2/list/${listId}/members?api_key=${apiKey}`, data)
		.then((response) => {
			return res.status(200).json({ status: 'Success', data: response.data })
		})
		.catch(error => {
			return res.status(400).json({ status: 'Error', error:error })
		});
}
