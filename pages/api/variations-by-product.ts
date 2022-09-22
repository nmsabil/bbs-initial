import { getProductVariant } from '@core/utils/shop';

export default async function handler(req, res) {
	const { id } = req.query;

  const variations = await getProductVariant(id);

	res.status(200).json({ data: variations });
}
