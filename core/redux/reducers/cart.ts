import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const CartSlice = createSlice({
	name: 'CART',
	initialState: {
		products: [],
		qty: 0,
		cart_loaded: false,
		cartOpen: false,
		coupons: [],
	},
	reducers: {
		addProduct: (state, action) => {
			state.products = [...state.products, action.payload.product];
			state.qty = state.qty + 1;
		},
		removeProduct: (state, action) => {
			state.qty = state.qty - 1;
			state.products = state.products.filter(
				(product) => product.item_key !== action.payload.item_key
			);
		},
		addQuantity: (state) => {
			state.cart_loaded = true;
		},
		refreshProduct: (state, action) => {
			state.products[action.payload.index] = action.payload.product;
		},
		loadCart: (state, action) => {
			state.products = action.payload || [];
			state.qty = action.payload?.length || 0;
			state.cart_loaded = true;
		},
		loadCoupon: (state, action) => {
			state.coupons = action.payload;
		},
		toggleOpenCart: (state) => {
			state.cartOpen = !state.cartOpen;
		},
	},
});

export const {
	addProduct,
	loadCart,
	loadCoupon,
	removeProduct,
	addQuantity,
	refreshProduct,
	toggleOpenCart,
} = CartSlice.actions;
export const useCart = () => useSelector((RootState: { cart }) => RootState.cart);
export default CartSlice.reducer;
