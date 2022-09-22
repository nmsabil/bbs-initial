import axios from 'axios';

export default async function handler(req, res) {
	const body = req.body;

	const { cart_key } = req.query;

	const response = await axios
		.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`,
			body,
			{ withCredentials: true }
		)
		.catch((err) => {
			// console.log(err.response)
			return err.response;
		});

	if (response.status !== 200) {
		return res.status(response.status).json(response.data);
	}

	res.status(200).json({ data: response.data, cart_key: response.headers['x-cocart-api'] });
}
