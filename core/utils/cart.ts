import axios from 'axios';
import Cookies from 'js-cookie';
const cocart = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/cocart/v2`,
	withCredentials: true,
});

export const getCartByKey = async ({ cart_key }) => {
	return await cocart.get(`/cart?cart_key=${cart_key}`);
};

export const removeProductByItemKey = async ({ item_key }) => {
	const key = Cookies.get('baked_cart_key') ?? '';
	return await cocart.delete(`/cart/item/${item_key}?cart_key=${key}`);
};

export const addToCartByKey = async (body, cart_key) => {
	return await axios.post('/api/cart?cart_key=' + cart_key, body);
};

export const addProductQuantity = async ({ quantity, item_key }) => {
	const body = {
		quantity,
		return_cart: true,
	};
	const key = Cookies.get('baked_cart_key') ?? '';
	return await cocart.post(`/cart/item/${item_key}?cart_key=${key}`, body);
};
