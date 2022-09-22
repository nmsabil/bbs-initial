import { queryRecipeById } from '@core/prismic/client';
import { createClient } from '../../prismicio'

export default async function handler(req, res) {
	const client = createClient();
	try {
		const { data } = req.body;

		const relatedRecipes = [];

		for (let i = 0; i < data.length; i++) {
			let result: any;
			if (data[i].related_recipe.type == 'recipes') {
				result = await queryRecipeById(client, data[i].related_recipe.uid);
			} else {
				result = {};
			}
			relatedRecipes.push(result);
		}

		res.status(200).json({ data: relatedRecipes });
	} catch {
		return res.status(500).json({ status: 'Failed' });
	}
}
