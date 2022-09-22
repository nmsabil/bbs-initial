import { getAllCategories } from '@core/utils/shop';

export default async function handler(req, res) {
	const filterByCategory = await getAllCategories().then(res => {
		if (res) {
			const filters = [];
			res.map(item => {
				filters.push({
					label: item.name,
					slug: item.slug
				});
			});

			return filters;
		}
	});

	res.status(200).json({ data: filterByCategory });
}
