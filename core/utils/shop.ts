import Woocomerce from '@core/lib/woocommerce';
import axios from 'axios';

const shop = new Woocomerce();

export const getProducts = async (per_page = 100) => {
	let data = await shop.get(`/products?per_page=${per_page}`);

	if(data && data.length > 0){
		data = data.sort((a,b) => a.menu_order - b.menu_order);
		return data.filter((item) => item.purchasable && item.status == 'publish');
	} else {
		return [];
	}
};

export const getProductsByCategory = async (per_page = 100) => {
	const data = await shop.get(`/products?per_page=${per_page}`);
	return data.filter((item) => item.purchasable);
};

export const getProductBySlug = async (slug: string) => {
	return await shop.get('/products?slug=' + slug);
};

export const getAllProductByIds = async (ids: string) => {
	return await shop.get('/products?include=' + ids);
};

export const getAllCategories = async () => {
	return await shop.get('/products/categories?per_page=100');
};

export const getAllTags = async () => {
	return await shop.get('/products/tags?per_page=100');
};

export const getProductOrderBYPopularity = async () => {
	const data = await shop.get('/products?orderby=popularity&order=desc');
	return data.filter((item) => item.purchasable);
};

export const getProductVariant = async (productid) => {
	return await shop.get(`/products/${productid}/variations`);
};

export const getRelatedProducts = async (ids) => {
	return await axios.get('/api/related-products?ids=' + ids);
};

export const getFilters = async (filterId) => {
	return await shop.get('/products/categories?parent=' + filterId);
};

export function getAttribute(product, name) {
	if (!product.attributes) return '';
	const attribute = product.attributes.filter((obj) => obj.name === name)[0];

	return attribute?.options || [];
}

export function getAttributes(product) {
	if (!product.attributes) return [];
	return product.attributes.map((attribute) =>
		(({ name, options }) => ({ name, options }))(attribute)
	);
}

export function getPermalink(product) {
	if (!product.variations[0]) return [];
	let permalink = product.variations[0].permalink;
	if (permalink) permalink = permalink.split('?')[1];
	if (permalink) permalink = permalink.split('&');
	if (permalink) permalink = permalink.map((item) => item.split('=')[0]);
	return permalink || [];
}

const slugifyOption: any = {
	lowercase: true,
};

export const slugify = (string, option = slugifyOption) => {
	if (string) {
		const { lowercase } = option;

		if (option === 'custom') {
			const slug = string
				.replace('&', '%26')
				.replace('\'', '%27')
				.replace('!', '%21')
				.replace(/ +/g, '+');

			return slug;
		} else if (lowercase) {
			const slug = string
				.toLowerCase()
				.replace(/&amp;/g, '')
				.replace(/[^\w -]+/g, '')
				.replace(/ +/g, '-');

			return slug;
		} else {
			const slug = string
				.replace(/&amp;/g, '')
				.replace(/[^\w -]+/g, '')
				.replace(/ +/g, '-');

			return slug;
		}
	} else {
		return null;
	}
};

export const slugifyWithoutLowercase = (string) => {
	if (string) {
		const slug = string
			.replace(/&amp;/g, '')
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
		return slug;
	} else {
		return null;
	}
};
