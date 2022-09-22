import { getAllProductByIds } from '@core/utils/shop';

export default async function handler(req, res) {
	const { ids } = req.query;

	const response = await getAllProductByIds(ids).then((res) => res);

	res.status(200).json({ data: response });
}
