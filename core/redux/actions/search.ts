import {
	updateFilter,
	updateSort,
	updateCategory,
	resetFilterAndSort,
} from '@core/redux/reducers/search';

export const updateFiltering: any = (filter, filters) => async (dispatch) => {
	const find = filters.find((obj) => obj.slug === filter.slug);
	if (find) {
		const filtered = filters.filter((obj) => obj.slug !== filter.slug);
		dispatch(updateFilter({ filters: filtered }));
	} else {
		dispatch(updateFilter({ filters: [...filters, filter] }));
	}
};

export const updateCategories: any = (filter, filters) => async (dispatch) => {
	const find = filters.find((obj) => obj.slug === filter.slug);
	if (find) {
		const filtered = filters.filter((obj) => obj.slug !== filter.slug);
		dispatch(updateCategory({ categories: filtered }));
	} else {
		dispatch(updateCategory({ categories: [...filters, filter] }));
	}
};

export const updateSorting: any = (sortBy, sort) => async (dispatch) => {
	if (sort?.slug === sortBy.slug) {
		dispatch(updateSort({ sort: {} }));
	} else {
		dispatch(updateSort({ sort: sortBy }));
	}
};

export const bulkFiltering: any = (filters) => async (dispatch) => {
	dispatch(updateFilter({ filters }));
};

export const resetAllFilterAndSort: any = () => async (dispatch) => {
	dispatch(resetFilterAndSort({}));
};
