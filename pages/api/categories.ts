import { getAllCategories } from '@core/utils/shop';

export default async function handler(req, res) {
	const { slugs } = req.query;

	if (slugs.includes(',')) {
		const arrayOfSlugs = slugs.split(',');

		const response = await getAllCategories().then((res) => res);

		const filteredCategories = response.filter((item) => {
			if (arrayOfSlugs.indexOf(item.slug) > -1) {
				return item;
			}
		});

		res.status(200).json({ data: filteredCategories });
	} else {
		const response = await getAllCategories().then((res) => res);

		const filteredCategories = response.filter((item) => item.slug === slugs);

		res.status(200).json({ data: filteredCategories });
	}
}
