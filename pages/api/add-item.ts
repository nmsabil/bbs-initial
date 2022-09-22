import axios from 'axios';
import formidable from 'formidable';
import FormData from 'form-data';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	try {
		const { cart_key } = req.query;
		const form = new formidable.IncomingForm();
		const formData = new FormData();

		await form.parse(req, (err, fields, files) => {
			console.log(fields);
		});

		// const response = await axios.post(`https://checkout.bakedbysteph.co.uk/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`, form);
		// console.log(response.data);
		return res.status(200).json({ status: 'success' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error' });
	}
}
