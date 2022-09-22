import { addProduct } from '../reducers/cart';
import {
	addProductQuantity,
	addToCartByKey,
	getCartByKey,
	removeProductByItemKey,
} from '@core/utils/cart';
import { loadCart, removeProduct, refreshProduct, loadCoupon } from '@core/redux/reducers/cart';
import axios from 'axios';

export const loadCartByKey: any = (cart_key) => async (dispatch) => {
	getCartByKey({ cart_key })
		.then((res) => {
			if (res.data.items) dispatch(loadCart(res.data.items));

			if (res.data.coupons) dispatch(loadCoupon(res.data.coupons));
		})
		.catch((err) => console.log(err));
};

export const addProductToCart: any =
	({ product, cart_key, duplicate, index, handleToggleCart, setLoading, checkout, errorAddingProduct }) =>
		async (dispatch) => {
			if (cart_key) {
				if (duplicate) {
					await axios.post(`https://checkout.bakedbysteph.co.uk/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`, product)
						.then(res => {
							console.log('res', res);
							getCartByKey({ cart_key }).then(() => {
								if (checkout) {
									setLoading(false);
									dispatch(refreshProduct({ product: res.data, index }));
									window.location.href = 'https://checkout.bakedbysteph.co.uk/checkout';
								} else {
									handleToggleCart();
									setLoading(false);
									dispatch(refreshProduct({ product: res.data, index }));
								}
							});
						})
						.catch(error => {
							console.log(error.response);
							setLoading(false);
							errorAddingProduct(error, `${error?.response?.data?.code}: ${error?.response?.data?.message}`);
						});
				} else {
					await axios.post(`https://checkout.bakedbysteph.co.uk/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`, product)
						.then(res => {
							console.log('res', res);
							getCartByKey({ cart_key }).then(() => {
								if (checkout) {
									setLoading(false);
									dispatch(addProduct({ product: res.data }));
									window.location.href = 'https://checkout.bakedbysteph.co.uk/checkout';
								} else {
									handleToggleCart();
									setLoading(false);
									dispatch(addProduct({ product: res.data }));
								}
							});
						})
						.catch(error => {
							console.log(error.response);
							setLoading(false);
							errorAddingProduct(error, `${error?.response?.data?.code}: ${error?.response?.data?.message}`);
						});
				}
			}
		};

export const removeProductFromCart: any = (item_key, setLoading) => async (dispatch) => {
	if (item_key) {
		setLoading(true);
		removeProductByItemKey({ item_key })
			.then(async () => {
				setLoading(false);
				dispatch(removeProduct({ item_key }));
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}
};

export const updateProductQuantity: any = (quantity, item_key, setLoading) => async (dispatch) => {
	if (item_key) {
		setLoading(true);
		addProductQuantity({ quantity, item_key })
			.then(async (res) => {
				setLoading(false);
				dispatch(loadCart(res.data.items));
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}
};

export const toggleCart: any = () => async (dispatch) => {
	dispatch(toggleCart());
};
