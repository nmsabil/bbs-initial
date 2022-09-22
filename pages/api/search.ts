import { getProducts } from '@core/utils/shop';

export default async function (req, res) {
	try {
		const { q } = req.query;
		const products = await getProducts();

		const results = products
			.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
			.concat(
				products.filter((product) =>
					product.categories.map((item) => item.name.toLowerCase()).includes(q.toLowerCase())
				)
			)
			.concat(
				products.filter((product) =>
					product.tags.map((item) => item.name.toLowerCase()).includes(q.toLowerCase())
				)
			);

		return res.json({ status: 'success', results: results });
	} catch (error) {
		return res.json({ status: 'failed' });
	}
}
