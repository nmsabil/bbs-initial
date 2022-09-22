import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function (req, res) {
	try {
		const form = new formidable.IncomingForm();
		form.parse(req, async function (err, fields, files) {
			const file = files.file;
			if (!file) return res.status(200).json({ status: 'No file found' });
			axios({
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/media`,
				method: 'POST',
				headers: {
					'Content-Disposition': `attachment; filename="${fields.filename}"`,
					'Content-Type': `${fields.type}`,
				},
				data: (file) ? fs.readFileSync(file.path) : null,
				auth: {
					username: process.env.WP_USERNAME,
					password: process.env.WP_PASSWORD,
				},
			})
				.then((response) => {
					return res.status(201).json({ status: 'success', source_url: response.data.source_url });
				})
				.catch((err) => {
					console.log(err);
					return res.status(400).json({ status: 'failed', message: err });
				});
		});
	} catch (error) {
		return res.status(500).json({ status: 'Failed', message: error });
	}
}

// export default (req, res) => {
// 	return req.method === 'POST'
// 		? post(req, res)
// 		: req.method === 'PUT'
// 			? console.log('PUT')
// 			: req.method === 'DELETE'
// 				? console.log('DELETE')
// 				: req.method === 'GET'
// 					? console.log('GET')
// 					: res.status(404).send('');
// };
