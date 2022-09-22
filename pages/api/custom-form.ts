import { getProducts } from '@core/utils/shop';
import { getForm } from '@core/utils/wordpress';

export default async function handler(req, res) {
	const { id } = req.query;

	if(id){
		const response = await getForm(id);

		if (response.status !== 200) {
			return res.status(response.status).json(response.data);
		}
	
		return res.status(200).json({ data: response.data });
	} else {
		const products = await getProducts();
		const forms = [];

		for (const product of products){
			const response = await getForm(product.id).then(res => res.data).catch(() => null);

			if (response) {
				forms.push({
					product_id: product.id,
					...response
				});
			}
		}
	
		return res.status(200).json({ data: forms });
	}
}
