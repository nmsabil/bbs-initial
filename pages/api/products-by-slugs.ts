import { getProductBySlug } from '@core/utils/shop';

export default async function handler(req, res) {
	const { slugs } = req.query;
	const slugArray = slugs.split(',');
	const products = [];
	for (const i in slugArray) {
		const slug = slugArray[i];
		const product = await getProductBySlug(slug);
		if (product) products.push(product[0]);
	}

	res.status(200).json({ data: products });
}
