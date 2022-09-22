// import prismic from '@prismicio/client';
import * as prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs';

const apiEndpoint = process.env.PRISMIC_API;
const accessToken = process.env.NEXT_PUBLIC_PRISMIC_TOKEN || '';

// Client is now created at /prismicio.ts, this is a backup client:
const client = prismic.createClient(apiEndpoint, { accessToken });

export const getByID = async (client, id: string): Promise<any> => {
	return client
		.query(prismic.Predicates.in('document.id', [id]), {
			pageSize: 100,
		})
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const getAllProductPaths = async (client): Promise<any> => {
	const pagination_count = await client
		.query(prismic.Predicates.any('document.type', ['pages']), {
			pageSize: 100,
		})
		.then((res) => res.total_pages);

	let docs: any[] = [];

	for (let i = 1; i <= pagination_count; i++) {
		const res = await client
			.query(prismic.Predicates.any('document.type', ['pages']), {
				page: i,
				pageSize: 100,
			})
			.then((res) => res.results)
			.catch((err) => console.log(err));
		docs = docs.concat(res);
	}

	const paths = docs
		.filter((doc) => doc.data.route.includes('/product'))
		.map((doc) => {
			const slug = doc.data.route.split('/').filter((item) => item);
			return { params: { slug: slug[1] } };
		});

	const paths_localed = docs
		.filter((doc) => doc.data.route.includes('/product'))
		.map((doc) => {
			const slug = doc.data.route.split('/').filter((item) => item);
			return { params: { slug: slug[1] } };
		});

	return [...paths, ...paths_localed];
};

export const getAllPaths = async (client): Promise<any> => {
	const pagination_count = await client
		.query(prismic.Predicates.any('document.type', ['pages', 'blog', 'recipes', 'careers']), {
			pageSize: 100,
		})
		.then((res) => res.total_pages);

	let docs: any[] = [];

	for (let i = 1; i <= pagination_count; i++) {
		const res = await client
			.query(prismic.Predicates.any('document.type', ['pages', 'blog', 'recipes', 'careers']), {
				page: i,
				pageSize: 100,
			})
			.then((res) => res.results)
			.catch((err) => console.log(err));
		docs = docs.concat(res);
	}

	const paths = docs
		.filter(
			(doc) =>
				doc.data.route !== '/' && doc.data.route !== '/shop' && !doc.data.route?.includes('/products/')
		)
		.map((doc) => {
			const customs = doc.data.route ? doc.data.route.split('/').filter((item) => item) : [];
			return { params: { customs } };
		});

	const paths_localed = docs
		.filter(
			(doc) =>
				doc.data.route !== '/' && doc.data.route !== '/shop' && !doc.data.route?.includes('/products/')
		)
		.map((doc) => {
			const customs = doc.data.route ? doc.data.route.split('/').filter((item) => item) : [];
			return { params: { customs } };
		});


	return [...paths, ...paths_localed];
};

export const queryByRoute = (client, route: string): Promise<ContentType> => {
	return client
		.query(prismic.Predicates.at('my.pages.route', route))
		.then((res) => res.results[0].data)
		.then(async (res) => injectBlogpostData(res, await queryAllBlogpost(client)))
		.then(async (res) => injectCareersData(res, await queryAllCareers(client)))
		.catch(() => null);
};

export const querySingleProduct = (client): Promise<ContentType> => {
	return client
		.query(prismic.Predicates.at('my.product.uid', 'single-product'))
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const queryCareersByRoute = (client, route: string): Promise<ContentType> => {
	return client
		.query(prismic.Predicates.at('my.careers.route', route))
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const queryRecipesByRoute = (client, route: string): Promise<ContentType> => {
	return client
		.query(prismic.Predicates.at('my.recipes.route', route))
		.then((res) => res.results[0].data)
		.then(async (res) => injectBlogpostData(res, await queryAllBlogpost(client)))
		.catch(() => null);
};

export const queryRecipeById = (client, id: string): Promise<any> => {
	return client
		.query(prismic.Predicates.at('my.recipes.uid', id))
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const formatNavbarContent = (navbarContent: LayoutContentType) => {
	const navbar = [];
	let currentDropdownIndex: number;

	navbarContent.body.forEach((slice, index) => {
		switch (slice.slice_type) {
			case 'inner_link':
				let children = [];

				slice.items = slice.items.filter((item) => {
					return item.label.length > 0;
				});

				slice.items.forEach((item) => {
					children.push({
						label: RichText.asText(item.label),
						url: item.url ?? '/',
					});
				});

				children = children.length > 0 ? children : null;

				navbar[currentDropdownIndex].children.push({
					label: RichText.asText(slice.primary.label),
					url: slice.primary.url ?? '/',
					children,
					only_mobile: slice.primary.only_mobile,
					desktop_only: slice.primary.desktop_only,
				});
				break;
			case 'dropdown_link':
				let children_own = [];

				slice.items = slice.items.filter((item) => {
					return item.label.length > 0;
				});

				slice.items.forEach((item) => {
					children_own.push({
						label: RichText.asText(item.label),
						url: item.url ?? '/',
					});
				});

				children_own = children_own.length > 0 ? children_own : null;

				currentDropdownIndex = index;
				navbar.push({
					label: RichText.asText(slice.primary.label),
					url: slice.primary.url ?? '/',
					children: [],
					only_mobile: slice.primary.only_mobile,
					desktop_only: slice.primary.desktop_only,
					children_own: children_own,
				});
				break;

			default:
				navbar.push({
					label: RichText.asText(slice.primary.label),
					url: slice.primary.url,
					only_mobile: slice.primary.only_mobile,
					desktop_only: slice.primary.desktop_only,
				});
				break;
		}
	});

	return navbar;
};

export const queryLayout = (client, uid: string): Promise<LayoutContentType> => {
	return client
		.query(prismic.Predicates.at('my.layouts.uid', uid))
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const queryMenuContent = (client, id: string): Promise<LayoutContentType> => {
	return client
		.query(prismic.Predicates.at('document.id', id))
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const queryAllBlogpost = async (client) => {
	const allrecipes = await client
		// .query([prismic.Predicates.at('document.type', 'recipes')], {orderings: '[my.recipes.date_created desc]'})
		.query(prismic.Predicates.at('document.type', 'recipes'))
		.then((res) => res.results)
		.then((blogposts) =>
			blogposts.map((item) => ({ ...item.data, uid: item.uid, category: 'recipes', type: item.type }))
		)
		.catch(() => null);
	const allnews = await client
		// .query([prismic.Predicates.at('document.type', 'blog')], {orderings: '[my.blog.date_created desc]'})
		.query(prismic.Predicates.at('document.type', 'blog'))
		.then((res) => res.results)
		.then((blogposts) =>
			blogposts.map((item) => ({ ...item.data, uid: item.uid, category: item.data?.type?.slug ? item.data.type.slug : 'news', type: item.type }))
		)
		.catch(() => null);

	const allblogpost = [].concat(allrecipes, allnews);
	return allblogpost;
};

export const queryAllCareers = (client) => {
	return client
		.query(prismic.Predicates.at('document.type', 'careers'))
		.then((res) => res.results)
		.then((careers) => careers.map((item) => ({ ...item.data, uid: item.uid })))
		.catch(() => null);
};

export const injectBlogpostData = (content, blogposts) => {
	const targets = ['blog', 'more_interviews'];

	if (content.body1?.length > 0) {
		const new_slices = content.body1.map((slice) => {
			if (targets.includes(slice.slice_type)) {
				return { ...slice, items: blogposts };
			} else return slice;
		});
		return { ...content, body1: new_slices };
	} else {
		const new_slices = content.body.map((slice) => {
			if (targets.includes(slice.slice_type)) {
				return { ...slice, items: blogposts };
			} else return slice;
		});
		return { ...content, body: new_slices };
	}
};

export const injectCareersData = (content, careers) => {
	const targets = ['vacancies_list'];

	const new_slices = content.body.map((slice) => {
		if (targets.includes(slice.slice_type)) {
			return { ...slice, careers: careers };
		} else return slice;
	});
	return { ...content, body: new_slices };
};

export const queryBlogByRoute = (client, route: string): Promise<ContentType> => {
	return client
		.query(prismic.Predicates.at('my.blog.route', route))
		.then((res) => ({
			...res.results[0].data,
		}))
		.then(async (res) => injectBlogpostData(res, await queryAllBlogpost(client)))
		.catch(() => null);
};

export const getSingleType = async (uid: string, lang = '*'): Promise<ContentType> => {
	return client
		.query(prismic.Predicates.at('document.type', uid), { lang: lang })
		.then((res) => res.results[0].data)
		.catch(() => null);
};

// export const queryInterviewsByRoute = (client, route: string): Promise<ContentType> => {
// 	return client
// 		.query(prismic.Predicates.at('my.interviews.route', route))
// 		.then((res) => res.results[0].data)
// 		.then(async (res) => injectBlogpostData(res, await queryAllBlogpost(client)))
// 		.catch(() => null);
// };
//
// export const queryCompetitionsByRoute = (client, route: string): Promise<ContentType> => {
// 	return client
// 		.query(prismic.Predicates.at('my.competitions.route', route))
// 		.then((res) => res.results[0].data)
// 		.then(async (res) => injectBlogpostData(res, await queryAllBlogpost(client)))
// 		.catch(() => null);
// };

export default client;

export interface SliceType {
	items: any[];
	primary: any;
	slice_label?: any;
	slice_type: string;
}

export interface ContentType {
	html_title: string;
	route: string;
	body: SliceType[];
	body1?: SliceType[];
	layout: { uid: string };
}

export interface LayoutContentType {
	body: SliceType[];
}
