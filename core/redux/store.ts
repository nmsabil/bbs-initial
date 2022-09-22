import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cart';
import layoutReducer from './reducers/layout';
import searchReducer from './reducers/search';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		layout: layoutReducer,
		search: searchReducer,
	},
});

export default store;
