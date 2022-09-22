import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const SearchSlice = createSlice({
	name: 'SEARCH',
	initialState: {
		filters: [],
		categories: [],
		sort: {},
	},
	reducers: {
		updateFilter: (state, action) => {
			state.filters = action.payload.filters;
		},
		updateCategory: (state, action) => {
			state.categories = action.payload.categories;
		},
		updateSort: (state, action) => {
			state.sort = action.payload.sort;
		},
		resetFilterAndSort: (state, action) => {
			state.sort = {};
			state.filters = [];
		},
		resetAll: (state) => {
			state.categories = [];
			state.sort = {};
			state.filters = [];
		},
	},
});

export const { updateFilter, updateSort, updateCategory, resetFilterAndSort, resetAll } =
	SearchSlice.actions;
export const useSearch = () => useSelector((RootState: { search }) => RootState.search);
export default SearchSlice.reducer;
