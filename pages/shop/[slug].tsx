/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import useResize from 'use-resizing';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { formatNavbarContent, queryLayout, queryMenuContent } from '@core/prismic/client';
import { createClient } from '../../prismicio'

import { getAttributes, getPermalink, getProducts, getProductVariant, slugify, getProductBySlug } from '@core/utils/shop';
import { addProductToCart } from '@core/redux/actions/cart';
import { toggleOpenCart, useCart } from '@core/redux/reducers/cart';

import MainLayout from '@components/_layouts/MainLayout';
import CarouselPhoto from '@components/products/product-popup/CarouselPhoto';
import PopUpContent from '@components/products/product-popup/PopUpContent';
import PopUpFooter from '@components/products/product-popup/PopUpFooter';
import { useLayouts } from '@core/redux/reducers/layout';
import axios from 'axios';
import { getForm } from '@core/utils/wordpress';
interface ShopProps {
	product: any;
	layout_content: any
	navbar: any;
	footer: any;
	announcement: any,
  attributes: any;
	forms? : any
	formsData?: any;
}

const Shop = ({ product, layout_content, navbar, footer, announcement, attributes, forms : wsForm, formsData }: ShopProps): JSX.Element => {
	const screen = useResize().width;
	const { announcementOpen } = useLayouts();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [disableButton, setDisableButton] = useState(true);
	const [inventoryLow, setInventoryLow] = useState(false);
	const [stockStatus, setStockStatus] = useState(product.stock_status);
	const [price, setPrice] = useState(parseInt(product.price));
	const popup = layout_content.body.find((slice=> slice.slice_type === 'popup')) || null;
	const cookiePopup = layout_content.body.find((slice=> slice.slice_type === 'cookie_popup')) || null;
	const seo_image = (product.images.length && product.images[0]?.src) ? product.images[0]?.src : (product?.wpr_featured_image ? product?.wpr_featured_image[0] : null);
	const hasAttributes = product?.attributes?.length;
	const [variant, setVariant] = useState(hasAttributes ? product.variations[0] : null);
	const [stockQuantity, setStockQuantity] = useState(variant ? variant.stock_quantity : product.stock_quantity);
	const [realtimeProduct, setRealtimeProduct] = useState(null)

	const permalink = getPermalink(product);
	const initialFormState = {
		custom: false,
		quantity: '1',
		message: '',
	};

	const [form, mutateForm] = useState({...initialFormState});

	useEffect(() => {
		attributes.map((item) => {
			initialFormState[slugify(item.name)] = item.options[0];
		});
		mutateForm({...initialFormState});
	}, [attributes]);

	const [images, setImage] = useState([]);
	const [createObjectURL, setCreateObjectURL] = useState([]);

	const dispatch = useDispatch();
	const { products } = useCart();
	const key = Cookies.get('baked_cart_key');

	const handleToggleCart = () => {
		dispatch(toggleOpenCart());
	};

	const addToCart = async (checkout) => {
		setLoading(true);
		const item = products.filter(obj => obj.slug === product.slug);
		const index = products.findIndex(obj => obj.slug === product.slug);

		const productObject = getProductObject();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const formatted = Object.fromEntries(Object.entries(productObject).filter(([_, v]) => v != null && v != undefined));

		const formBody = new FormData();
		Object.keys(formatted).forEach((key) => {
			if(Array.isArray(formatted[key])){
				formatted[key].forEach((x) => {
					formBody.append(key, x);
				});
			} else {
				formBody.append(key, formatted[key]);
			}
		});

		if(images && images.length > 0){
			images.forEach(image => {
				if(image.image && image.key ){
					formBody.append(image.key, image.image);
				}
			});
		}

		if( permalink &&
			attributes &&
			permalink.length > 0 &&
			attributes.length > 0 &&
			permalink.length === attributes.length
		){
			permalink.forEach((item, index) => {
				if (['Colour', 'Flavour', 'Size'].includes(attributes[index].name)){
					formBody.append(`variation[${item}]`, slugify(form[slugify(attributes[index].name)]));
				} else {
					formBody.append(`variation[${item}]`, form[slugify(attributes[index].name)]);
				}
			});
		}

		await dispatch(addProductToCart({
			product: formBody,
			cart_key: key,
			duplicate: item.length > 0,
			index,
			handleToggleCart: handleToggleCart,
			setLoading,
			checkout,
			errorAddingProduct
		}));
	};

	const getProductObject = () => {
		const variation = {};

		permalink.map((item, index) => {
			if (['Colour', 'Flavour', 'Size'].includes(attributes[index].name)){
				variation[item] = slugify(form[slugify(attributes[index].name)]);
			} else {
				variation[item] = form[slugify(attributes[index].name)];
			}
		});

		const keys = {};
		for(const i in form){
			if(i.includes('field_')){
				keys[i] = form[i];
			}
		}

		const productObject = {
			id: `${product.id}`,
			quantity: form.quantity,
			variation: wsForm ? null : Object.keys(variation).length !== 0 ? variation : null,
			return_item: true,
			wsf_form_id: wsForm && formsData?.wsf_form_id,
			wsf_nonce: wsForm && formsData?.wsf_nonce,
			wsf_post_id: wsForm && `${product.id}`,
			wsf_post_mode: wsForm && 'submit',
			...keys
		};

		return productObject;
	};

	const uploadToClient = (event, key) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];

			setImage([...images, { image: i, key }]);
			setCreateObjectURL([...createObjectURL, URL.createObjectURL(i)]);
		}
	};

	useEffect(() => {

		const fetchRTProduct = async () => {
			/***
			When the site hasn't been built for a while the stock quantity isn't set correctly,
			so we have to fetch the latest product data on site load
			If this has already been assigned, go straight to next function
			***/
			if (realtimeProduct) setPriceAndStock(); // If this has already been assigned, go straight to next function
			else {
				const res = await axios.get('/api/products-by-slugs?slugs=' + product.slug);
				if (res?.data?.data[0]) {
					const rt_product = res?.data?.data[0];
					const variations_res = await axios.get('/api/variations-by-product?id=' + product.id);
					rt_product.variations = variations_res?.data?.data ? variations_res?.data?.data : product.variations;
					setRealtimeProduct(rt_product)
					setPriceAndStock();
				} else setPriceAndStock();
			}
		}

		const setPriceAndStock = () => {
			product = realtimeProduct ? realtimeProduct : product;
			if (hasAttributes) {
				const variations = product.variations;
				// only for product with one attribute
				const attribute = product.attributes[0].name?.toLowerCase();
				const item = (['size', 'flavour', 'colour'].includes(attribute)) ? variations.find(variation => variation.attributes[0].option === form[attribute]) : product;
				setVariant(item);
				setPrice(parseFloat(item?.price)*parseFloat(form.quantity));
				setStockQuantity(item?.stock_quantity)
				setStockStatus(item?.stock_status)
				// TODO: logic for product with multi attributes
			} else {
				setPrice(parseFloat(product?.price)*parseFloat(form.quantity));
				setStockQuantity(product?.stock_quantity)
				setStockStatus(product?.stock_status)
			}
			checkForm();
		}

		const checkForm = () => {
			if(wsForm){
				const required = wsForm.filter(x => x.required === true && x.type !== 'file');
				const requiredField = required.map(req => `field_${req.id}`);
				const file = wsForm.find(x => x.type === 'file');

				let imageRequired = false;

				if(file && file.required){
					imageRequired = true;
				}

				const everythingFilled = [];
				requiredField.forEach(reqField => {
					if(!form[reqField] || form[reqField] === ''){
						everythingFilled.push(false);
					}else {
						everythingFilled.push(true);
					}
				});

				if(everythingFilled.every(x => x === true)){
					if(imageRequired){
						if(images.length > 0){
							setDisableButton(false);
						}else{
							setDisableButton(true);
						}
					}else{
						setDisableButton(false);
					}
				}else {
					setDisableButton(true);
				}

				if(product.manage_stock){
					if(stockQuantity < form.quantity){
						setInventoryLow(true);
						setDisableButton(true);
					}
				}
			}else {
				setDisableButton(false);
			}
		}

		fetchRTProduct()
			.catch(console.error);

	}, [form, images, realtimeProduct, stockStatus, stockQuantity]);

	const errorAddingProduct = (error, message = '') => {
		setError(true);
		// const item = products.filter(obj => obj.slug === product.slug);
		// const index = products.findIndex(obj => obj.slug === product.slug);
		const productObject = getProductObject();
		axios.put('/api/report-error', { subject: 'Failed to add product', error, body: JSON.stringify(productObject), info: `Failed to add product on product page - Cart key ${key}`, message: message});
	};

	useEffect(() => {
		setTimeout(() => setError(false), 4000);
	}, [setError, error]);


	return (
		<MainLayout className="col justify-start" title={product.name} image={seo_image} navbar={navbar} footer={footer} announcement={announcement} popup={popup} cookiePopup={cookiePopup} content={[]}>
			<h1 className='hidden'>{`${product.name ? product.name+' — ' : ''}Baked by Steph`}</h1>

			<Header product={product} announcementOpen={announcementOpen} price={price} addToCart={addToCart} loading={loading} disableBuy={disableButton} error={error} inventoryLow={inventoryLow} stockStatus={stockStatus} />

			<div className="container relative flex-sc col px-14 -md:px-0">
				<div className="absolute inset-0 px-8 pointer-events-none -lg:hidden full py-28 -lg:pt-20" style={{ width: '47%' }}>
					<CarouselPhoto images={product.images} trainview zoomable />
				</div>

				<div className="px-8 overflow-y-scroll py-28 full no-scrollbar -lg:pt-0 -lg:pb-0 -lg:px-0" style={{ paddingLeft: screen > 1279 ? '47%' : screen > 1023 ? '47%' : '' }}>
					<div className="flex-cc w-full lg:hidden sm:mt-8 md:mt-16 lg:mt-0">
						<CarouselPhoto images={product.images} />
					</div>
					<div className="px-4">
						<PopUpContent product={product} mutateForm={mutateForm} form={form} uploadToClient={uploadToClient} createObjectURL={createObjectURL} wsForm={wsForm}/>
					</div>
				</div>
			</div>

			<div className="fixed bottom-0 w-full" style={{zIndex: 1}}>
				<PopUpFooter price={price} regularPrice={product.regular_price} salePrice={product.sale_price} addToCart={addToCart} status={stockStatus} loading={loading} disableBuy={disableButton} error={error} inventoryLow={inventoryLow}/>
			</div>
		</MainLayout>
	);
};

interface HeaderProps {
	product: any;
	announcementOpen: any;
	price: number;
	addToCart(boolean): void;
	loading?: boolean;
	disableBuy?: boolean;
	inventoryLow?: boolean;
	stockStatus: any;
	error: any
}

const Header = ({product, announcementOpen, price, addToCart, loading, disableBuy, inventoryLow, error, stockStatus}: HeaderProps) => {
	const [openMessage, setOpenMessage] = useState(false);

	const handleCart = () => {
		if (disableBuy){
			setOpenMessage(true);
			scrollToMissingField();
			return;
		}
		addToCart(false);
	};

	const scrollToMissingField = () => {
		const element = document.getElementById('custom-message');
		if (element) {
			const y = element.getBoundingClientRect().top + window.pageYOffset - 250;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	};

	useEffect(() => {
		setTimeout(() => setOpenMessage(false), 7000);
	}, [openMessage]);
	return (
		<div className={`flex-bs w-full py-4 md:px-12 xl:px-32 2xl:px-52 ${announcementOpen ? '-md:mt-16 -xl:mt-12' : ''} bg-white pointer-events-auto`} style={{ boxShadow: '0 0 20px #0005' }}>
			<div className="container flex-sc -md:px-4">
				<p className="flex-cc text-xl font-bold uppercase font-secondary" style={{ minHeight: 40 }}>{product.name}</p>
			</div>

			<div className="flex-cc gap-6">
				<div className="-lg:hidden flex-cc gap-2">
					{product.sale_price ? (
						<>
							<p className="flex-cc text-xl font-semibold line-through uppercase -sm:text-base font-secondary">£{product.regular_price}</p>
							<p className="flex-cc text-xl font-semibold uppercase -sm:text-md text-pink font-secondary">£{product.sale_price}</p>
						</>
					) : (
						<p className="flex-cc text-xl font-semibold uppercase -sm:text-md text-pink font-secondary">£{price.toFixed(2)}</p>
					)}
				</div>
				{
					(stockStatus === 'instock') ?(
						<div className='-lg:hidden relative'>
							{openMessage && <div className='absolute whitespace-nowrap bottom-[-3.75rem] right-0 bg-pink rounded-sm text-white px-4 py-2'>
								{inventoryLow && <span>Not enough stock left</span>}
								{!inventoryLow && <span>Please fill out all required fields!</span>}
							</div>}
							{error && <div className='absolute whitespace-nowrap bottom-[-3.75rem] right-0 bg-pink rounded-sm text-white px-4 py-2'>Error adding item to cart - Please try again!</div>}
							<div className="flex-cc">
								<button className={`${disableBuy ? 'opacity-60' : ''} flex-cc px-12 py-2 text-white rounded-full text-md -sm:text-sm bg-pink -sm:py-1 -sm:px-7 font-medium ${loading ? 'loading' : ''}`} onClick={handleCart}>
									{loading && <div className="loader"></div>}
									<p className="whitespace-nowrap">Add to Basket</p>
								</button>
							</div>
						</div>
					) : (<p className="-lg:hidden ml-4 text-pink whitespace-nowrap -sm:text-lg text-xl">[OUT OF STOCK]</p>)
				}
				<style
					dangerouslySetInnerHTML={{
						__html: `
					@keyframes loading {
						0% {width: 0%; }
						50% { width: 40%; }
						80% { width: 80%; }
						99% { width: 100%; }
					}

					.button-loading{
						transition: .3s ease-in-out;
						width:184px;
						position:relative;
					}
					@media (max-width: 768px) {
						.button-loading{
							transition: .3s ease-in-out;
							width:140px;
							position:relative;
						}
					}

					.button-loading:focus, .button-loading:active{
						border:0;
						outline:0;
					}

					button span{
						position:absolute;
						top:50%;
						left:50%;
						transform: translate(-50%,-50%);
					}

					button.loading{
						position:relative;
						padding-top:0;
						padding-bottom:0;
						height:18px;
						background:#cccccc;
					}

					.loader{
						background: #FF5897;
						width:100%;
						height:100%;
						position:absolute;
						left:0;
						top:0;
						animation: loading 2s;
					}

					button.loading span{
						opacity:0;
					}
					`,
					}}
				/>
			</div>
		</div>
	);
};


export async function getStaticPaths() {
	const news = await getProducts();

	const paths = news.map((product) => {
		return ({
			params: { slug: product.slug },
		});
	});

	const filteredPaths = paths.filter(path => path.params.slug !== '');

	return { paths: filteredPaths, fallback: false };
}

export async function getStaticProps({params, previewData}) {
	const props : ShopProps = {
		product: null,
		layout_content: null,
		navbar: null,
		footer: null,
		announcement: null,
		attributes: null,
	};
	const client = createClient({previewData});
	const { slug } = params;

	const layout_content = await queryLayout(client, 'main-layout');
	props.layout_content = layout_content;

	const footerSlice = layout_content.body.find((slice) => slice.slice_type === 'footer');
	const footerContent = await queryMenuContent(client, footerSlice.primary.footer_content.id);
	props.footer = footerContent;

	const products = await getProducts();
	const product = products.filter(item => item.slug === slug)[0];
	// const product = filteredProducts ? filteredProducts[0] : null;

	const variation = await getProductVariant(product.id);
	product.variations = variation;
	props.product = product;

	const attributes = getAttributes(product);
	props.attributes = attributes;

	const navbarSlice = layout_content.body.find((slice=> slice.slice_type === 'navbar'));
	const navbarContent = await queryMenuContent(client, navbarSlice.primary.navbar_content.id);

	props.navbar = formatNavbarContent(navbarContent);

	props.announcement = layout_content.body.find((slice=> slice.slice_type === 'announcement'));

	const forms = await getForm(product.id)
		.then(response=>response.data)
		.catch(err=>console.log("Product has no form."));

	try {
		if(forms){
			const formData = forms.form;

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
			props.forms = formatedForms;
			props.formsData = {
				wsf_nonce: forms.localization_object.wsf_nonce,
				wsf_form_id: forms.form.id
			};
		}
		return {
			props
		};
	} catch (error) {
		return {
			props
		};
	}
}

export default Shop;
