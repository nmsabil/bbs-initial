import axios from 'axios';
import { getFilters } from './shop';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
	baseURL: baseURL + '/wp-json/wp/v2/',
	auth: {
		username: process.env.WP_USERNAME,
		password: process.env.WP_PASSWORD,
	},
});

export const getForm = async (productId: number) => {
	return axios.get(baseURL + `/wp-json/ws-form/v1/action/woocommerce/product-form/${productId}`);
};

// Pages
export const getPageBySlug = async (slug: string) => {
	return await api.get('pages?_embed&slug=' + slug);
};

// Post
export const getPostBySlug = async (slug: string) => {
	return await api.get('posts?_embed&slug=' + slug);
};

// Category
export const getCategoryById = async (id: number) => {
	return await api.get('categories/' + id);
};

// News
export const getNews = async () => {
	return await api.get('posts?_embed&categories=5');
};

// Blogs
export const getBlogs = async () => {
	return await api.get('posts?_embed&categories=4,5');
};

const getCategoryBySlug = async (slug: string) => {
	return await api.get('categories?slug=' + slug);
};

// Recipe
export const getRecipes = async () => {
	const category = await getCategoryBySlug('recipes').then((res) => res.data[0]);
	return await api.get(`posts?_embed&categories=${category.id}`);
};

export const getAllRecipes = async () => {
	return await api.get(`posts`);
};

// Careers
export const getCareers = async () => {
	const category = await getCategoryBySlug('careers').then((res) => res.data[0]);
	return await api.get(`posts?categories=${category.id}`);
};

export const getCareerBySlug = async (slug: string) => {
	const category = await getCategoryBySlug('careers').then((res) => res.data[0]);

	return await api.get(`posts?categories=${category.id}&slug=${slug}`);
};

// Users
export const getAllUser = async () => {
	return await api.get('users?context=edit');
};

// Block separator
export const SEPARATOR = '<hr class="wp-block-separator"/>\n\n\n\n';

// Footer
export const getFooter = async () => {
	const footer1 = await api
		.get('menus/footer-menu-1')
		.then((res) => res.data)
		.catch((err) => console.log('failed to fetch footer1', err));
	const footer2 = await api
		.get('menus/footer-menu-2')
		.then((res) => res.data)
		.catch(() => console.log('failed to fetch footer2'));
	const footer3 = await api
		.get('menus/footer-menu-3')
		.then((res) => res.data)
		.catch(() => console.log('failed to fetch footer3'));

	const footer = {
		footer1: footer1,
		footer2: footer2,
		footer3: footer3,
	};

	return footer;
};

// Navbar
export const getNavbar = async () => {
	const { data } = await api.get('menus/navigation-menu');

	const filterByCategory = await getFilters(28).then((res) => {
		if (res) {
			const filters = [];
			res.map((item) => {
				filters.push({
					label: item.name,
					slug: item.slug,
				});
			});

			return filters;
		}
	});

	const filterByProduct = await getFilters(26).then((res) => {
		if (res) {
			const filters = [];
			res.map((item) => {
				filters.push({
					label: item.name,
					slug: item.slug,
				});
			});

			return filters;
		}
	});

	const formatedProductMenu = filterByProduct.map((item) => {
		return {
			label: item.label,
			url: '/shop?products=' + item.slug,
			children: null,
		};
	});

	const formatedCategoryMenu = filterByCategory.map((item) => {
		return {
			label: item.label,
			url: '/shop?categories=' + item.slug,
			children: null,
		};
	});

	const shopMenu = {
		label: 'Shop',
		url: '/shop',
		children: [
			{
				label: 'Shop All',
				url: '/shop',
				children: null,
			},
			{
				label: 'By Product',
				url: '/shop',
				children: formatedProductMenu,
			},
			{
				label: 'By Categories',
				url: '/shop',
				children: formatedCategoryMenu,
			},
		],
	};

	const newNavbarMenus = data.menus.map((item) => {
		if (item.label === 'Shop') {
			return shopMenu;
		} else {
			return item;
		}
	});

	const newNavbar = { ...data, menus: data.menus };

	return newNavbar;
};
