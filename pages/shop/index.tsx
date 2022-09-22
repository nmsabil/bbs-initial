import React, { useState } from 'react';
import { StaticProps } from '../[...customs]';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { formatNavbarContent, queryByRoute, queryLayout, queryMenuContent } from '@core/prismic/client';
import { getProducts, getProductVariant } from '@core/utils/shop';
import MainLayout from '@components/_layouts/MainLayout';
import RenderSlice from '@components/_slices/_renderslice';
import PopUpProduct from '@components/products/product-popup';
import { AnimatePresence } from 'framer-motion';
import { getForm } from '@core/utils/wordpress';
import { createClient } from '../../prismicio'

const CustomPage = ({ content, layout_content, navbar, footer, products, announcement, forms }: StaticProps): JSX.Element => {
	const router = useRouter();

	const redirects = {
		'All Cookies': '/products/cookies',
		'Cookie Cakes': '/products/cakes',
		'Cookies': '/products/cookies',
		'DIY Kits': '/products/diy-kits',
		'MACARONS': '/products/macarons',
	};
	// Redirect urls from old site
	if (redirects[router.query.category?.toString()]) router.push(redirects[router.query.category.toString()]);

	const { slug: realSlug } = router.query;
	const [shallowSlug, setShallowSlug] = useState(realSlug);
	const shallowData = products.filter(item => item.slug === shallowSlug)[0];
	const wsFormsData = forms.filter(item => item.slug === shallowSlug);
	const popup = layout_content.body.find((slice=> slice.slice_type === 'popup')) || null;
	const cookiePopup = layout_content.body.find((slice=> slice.slice_type === 'cookie_popup')) || null;

	const handleShallowPopUp = (slug: string): void => {
		const nextURL = `${router.basePath}/shop${slug ? `/${slug}` : ''}`;
		const nextTitle = 'Shop — Baked by Steph ';
		const nextState = { additionalInformation: 'Updated the URL with JS' };
		window.onpopstate = function() {

			if(document.location.pathname === '/shop'){
				setShallowSlug('');
			}else{
				setShallowSlug(document.location.pathname.replace('/shop/',''));
			}
		};
		window.history.pushState(nextState, nextTitle, nextURL);
		setShallowSlug(slug);
	};

	const resetShallow = () => {
		handleShallowPopUp('');
	};

	return (
		<MainLayout title={content['seo_title']} description={content['seo_description']} image={content['seo_image']?.url} key={router.asPath} navbar={navbar} footer={footer} announcement={announcement} popup={popup} cookiePopup={cookiePopup} content={content}>
			<h1 className='hidden'>{`${content['seo_title'] ? content['seo_title']+' — ' : ''}Baked by Steph`}</h1>

			{content.body.map((slice, i) => (
				<RenderSlice slice={slice} key={i} products={products} handleShallowPopUp={handleShallowPopUp}/>
			))}
			<AnimatePresence exitBeforeEnter>
				{shallowData && <PopUpProduct product={shallowData} handleClose={resetShallow} wsForm={wsFormsData && wsFormsData.length > 0 ? wsFormsData[0] : null}/>}
			</AnimatePresence>
		</MainLayout>
	);
};

export const getStaticProps = async ({previewData}): Promise<GetStaticPropsResult<StaticProps>> => {
	const client = createClient({previewData});
	const content = await queryByRoute(client, '/shop');
	const layout_content = await queryLayout(client, content.layout.uid);

	const navbarSlice = layout_content.body.find((slice=> slice.slice_type === 'navbar'));
	const navbarContent = await queryMenuContent(client, navbarSlice.primary.navbar_content.id);
	const navbar = formatNavbarContent(navbarContent);

	const footerSlice = layout_content.body.find((slice) => slice.slice_type === 'footer');
	const footer = await queryMenuContent(client, footerSlice.primary.footer_content.id);

	const announcement = layout_content.body.find((slice=> slice.slice_type === 'announcement'));

	let products = [];

	const allProducts = await getProducts();
	products = allProducts.filter(item => item.slug !== '');

	const productWithVariation = allProducts.filter(product => product.variations.length !== 0);
	if(productWithVariation.length) {
		for(let i=0; i<productWithVariation.length; i++){
			const variations = await getProductVariant(productWithVariation[i].id);

			const index = products.findIndex(product => product.id === productWithVariation[i].id);
			products[index].variations = variations;
		}
	}

	const forms = [];
	// The following filtering does not work for every product. Whitelist those products. Todo: find a better solution.
	const whitelist = [2052, 2045, 1973, 1811, 1769, 1766, 1505, 1225, 1194, 1015, 1010, 3607];
	const filteredProducts = products.filter(prod => {
		if(prod.meta_data.find(x => x.key === '_wsform_woocommerce_meta_data').value.actions_fire === 'yes' || whitelist.includes(prod.id)){
			return true;
		} else return false;
	});

	for (const product of filteredProducts){
		const response = await getForm(product.id).then(res => res.data).catch(() => null);

		if(response){
			const formData = response.form;

			const formatedForms : any[] = [];
			if(formData.groups)
				formData.groups.forEach(grup=>{
					grup.sections.forEach(section=>{
						section.fields.forEach(field=>{
							const meta = field.meta;
							const form : any = {
								section_id : section.id,
								label : field.label,
								type : field.type,
								id : field.id,
								placeholder : meta.placeholder ?? meta.placeholder_row ?? null,
								max_length: meta.max_length ? parseInt(meta.max_length) : null,
								required : meta.required === 'on',
								sort_index : field.sort_index
							};

							if(form.type === 'select'){
								const selectOptions = [];
								const indexLabel = parseInt(meta.select_field_label);
								const indexvalue = parseInt(meta.select_field_value);
								meta.data_grid_select.groups.forEach(group=>{
									if(group.label.toLowerCase() === 'Options'){
										group.rows.forEach(option=>{
											selectOptions.push({
												label : option.data[indexLabel],
												value : option.data[indexvalue],
												selected : option.default === 'on'
											});
										});
									}
								});
								form.options = selectOptions;
							} else if (form.type === 'checkbox'){
								const checkboxOptions = [];
								meta.data_grid_checkbox.groups.forEach(group=>{
									if(group.label === 'Checkboxes'){
										group.rows.forEach(row=>{
											checkboxOptions.push({
												label : row.data[0],
												value : row.data[0],
												selected : row.default === 'on' || meta.select_all === 'on'
											});
										});
									}
								});
								form.checkbox_options = checkboxOptions;
							} else if (form.type === 'file'){
								form.preview = meta.preview === 'on';
								form.file_min_size = meta.file_min_size;
								form.file_max_size = meta.file_max_size;
								form.accept = meta.accept;
								form.multiple_file = meta.multiple_file === 'on';
							}
							formatedForms.push(form);
						});
					});
				});

			if (formatedForms) {
				forms.push({
					product_id: product.id,
					slug: product.slug,
					wsf_nonce: response.localization_object.wsf_nonce,
					wsf_form_id: response.form.id,
					forms: formatedForms
				});
			}
		}
	}

	return {
		props: {
			content,
			layout_content,
			navbar,
			footer,
			products,
			announcement,
			forms
		},
	};
};

export default CustomPage;
