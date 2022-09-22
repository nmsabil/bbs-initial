import { getProducts } from '@core/utils/shop';

export default async function handler(req, res) {
	const { ids } = req.query;
	const response = await getProducts();
	const products = response.filter((product) => ids.includes(product.id));

	res.status(200).json({ products });
}
