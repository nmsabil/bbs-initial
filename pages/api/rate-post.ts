import { ratePost } from '@core/utils/posts';

export default async function handler(req, res) {
	try {
		const { id, rating, number_of_votes, current_rating } = req.body;

		await ratePost({ id, rating, number_of_votes, current_rating });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(500).json({ status: 'failed' });
	}
}
