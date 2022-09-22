import { api } from '@core/utils/wordpress';

export const getPostUrl = (item) => {
	const newsPath = '/news/';
	const recipesPath = '/recipe/';

	if (item.categories.includes(5)) {
		return newsPath + item.slug;
	}
	if (item.categories.includes(4)) {
		return recipesPath + item.slug;
	} else {
		return item.slug;
	}
};

export const ratePost = async ({ id, rating, number_of_votes = '0', current_rating = '0' }) => {
	const newTotalVotes = parseInt(number_of_votes) + 1;

	const currentTotalRating = parseInt(number_of_votes) * parseInt(current_rating);
	const newTotalRating = (currentTotalRating + parseInt(rating)) / newTotalVotes;

	const body = {
		fields: {
			overall_rating: `${newTotalRating}`,
			number_of_votes: newTotalVotes,
		},
	};
};

export const getCategories = async () => {
	const results = await api.get('categories');
	const filtered = results.data.filter((cat) => cat.id !== 1);

	return filtered;
};
