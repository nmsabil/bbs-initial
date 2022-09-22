import { getPostBySlug } from '@core/utils/wordpress';

export default async function handler(req, res) {
	const { slug } = req.query;

	const response = await getPostBySlug(slug).then((res) => res.data[0]);

	res.status(200).json({ data: response });
}
