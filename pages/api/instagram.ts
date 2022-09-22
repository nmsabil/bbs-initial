import { getInstagramPosts } from '@core/utils/instagram';

export default async function handler(req, res) {
	const instagramPosts = (await getInstagramPosts()) ?? [];

	const formatedImages = [];

	instagramPosts.map((item) => {
		if (item.imageUrl) {
			formatedImages.push(item);
		}
	});

	res.status(200).json({ data: formatedImages });
}
