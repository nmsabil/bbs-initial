import axios from 'axios';

export const getInstagramPosts = async () => {
	const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
	if (accessToken) {
		const fields = 'id,media_url,media_type,thumbnail_url';
		const endpoint = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`;

		return axios
			.get(endpoint)
			.then((results) => {
				if (results.data) {
					const data = results.data.data;
					const images = data?.map((item) => {
						const image =
							item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
								? item.media_url
								: item.thumbnail_url;

						return {
							imageUrl: image,
						};
					});

					const finalData = images;

					return finalData;
				}
			})
			.catch((err) => {
				if (err.response) {
					// console.log(err.response.data);
				}
				return [];
			});
	} else {
		return [];
	}
};
