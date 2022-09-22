import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useResize from 'use-resizing';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUpHeader from './PopUpHeader';
import PopUpFooter from './PopUpFooter';
import PopUpContent from './PopUpContent';
import CarouselPhoto from './CarouselPhoto';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '@core/redux/actions/cart';
import { getAttributes, getPermalink, slugify } from '@core/utils/shop';
import Cookies from 'js-cookie';
import { toggleOpenCart, useCart } from '@core/redux/reducers/cart';
import axios from 'axios';

interface Props {
	product: any
	handleClose(): void
	wsForm?: any
}

const PopUpProduct = ({ product, handleClose, wsForm }: Props): JSX.Element => {
	const screen = useResize().width;
	const dispatch = useDispatch();
	const key = Cookies.get('baked_cart_key');
	const { products } = useCart();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [disableButton, setDisableButton] = useState(true);
	const [inventoryLow, setInventoryLow] = useState(false);
	const [stockStatus, setStockStatus] = useState(product.stock_status);
	const [price, setPrice] = useState(parseFloat(product?.price));
	const hasAttributes = product?.attributes?.length;
	const [variant, setVariant] = useState(hasAttributes ? product.variations[0] : null);
	const [stockQuantity, setStockQuantity] = useState(variant ? variant.stock_quantity : product.stock_quantity);
	const [realtimeProduct, setRealtimeProduct] = useState(null)

	const attributes = getAttributes(product);
	const permalink = getPermalink(product);

	const initialFormState = {
		custom: false,
		quantity: '1',
		message: '',
	};

	attributes.map((item) => {
		initialFormState[slugify(item.name)] = item.options[0];
	});

	const [form, mutateForm] = useState(initialFormState);

	const [images, setImage] = useState([]);
	const [createObjectURL, setCreateObjectURL] = useState([]);

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
			product: wsForm ? formBody : formatted,
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
			wsf_form_id: wsForm && wsForm?.wsf_form_id,
			wsf_nonce: wsForm && wsForm?.wsf_nonce,
			wsf_post_id: wsForm && `${product.id}`,
			wsf_post_mode: wsForm && 'submit',
			...keys
		};

		return productObject;
	};

	const uploadToClient = (event) => {
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
			product = realtimeProduct ? realtimeProduct : product;
			if(wsForm && Array.isArray(wsForm.forms) && wsForm.forms.length > 0){
				const required = wsForm.forms.filter(x => x.required === true && x.type !== 'file');
				const requiredField = required.map(req => `field_${req.id}`);
				const file = wsForm.forms.find(x => x.type === 'file');

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
		axios.put('/api/report-error', { subject: 'Failed to add product', error, body: JSON.stringify(productObject), info: `Failed to add product on product popup page - Cart key ${key}`, message: message });
	};

	useEffect(() => {
		setTimeout(() => setError(false), 4000);
	}, [setError, error]);

	return (
		<motion.div initial="initial" animate="enter" exit="exit" className="fixed inset-0 z-50 flex-cc bg-black bg-opacity-25 style-innerdiv full" variants={{ initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } }} >

			<motion.div className="container overflow-hidden relative z-50 bg-white fullfill-innerdiv" style={{ height: screen < 1200 ? '100%' : 'calc(100% - 24px)' }} variants={{ initial: { scale: 0.9, translateY: 20 }, enter: { scale: 1, translateY: 0 }, exit: { scale: 0.9, translateY: 20 } }} >
				<OutsideClickHandler onOutsideClick={handleClose}>
					<PopUpHeader title={product.name} handleClose={handleClose} price={price} regularPrice={product.regular_price} salePrice={product.sale_price} addToCart={addToCart} status={stockStatus} loading={loading} disableBuy={disableButton} inventoryLow={inventoryLow} error={error} />
					<div className="absolute inset-0 px-8 pointer-events-none -lg:hidden full py-28 -xl:pt-20 z-10" style={{ width: '47%' }}>
						<CarouselPhoto images={product.images} trainview zoomable />
					</div>

					<div className="px-8 overflow-y-scroll py-28 -sm:pt-32 full no-scrollbar -sm:px-4 relative " style={{ paddingLeft: screen > 1279 ? '47%' : screen > 1023 ? '47%' : '' }}>
						<div className="flex-cc w-full lg:hidden">
							<CarouselPhoto images={product.images} />
						</div>
						<PopUpContent product={product} mutateForm={mutateForm} form={form} uploadToClient={uploadToClient} createObjectURL={createObjectURL} wsForm={wsForm?.forms}/>
					</div>

					<PopUpFooter price={price} regularPrice={product.regular_price} salePrice={product.sale_price} addToCart={addToCart} status={stockStatus} loading={loading} disableBuy={disableButton} error={error} inventoryLow={inventoryLow} />
				</OutsideClickHandler>
			</motion.div>

			<style dangerouslySetInnerHTML={{ __html: 'body {overflow: hidden;}' }} />
		</motion.div>
	);
};

export default PopUpProduct;
