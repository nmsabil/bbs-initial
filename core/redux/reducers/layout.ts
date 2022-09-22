import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const LayoutSlice = createSlice({
	name: 'LAYOUT',
	initialState: {
		footer: {
			items: {},
			loaded: false,
		},
		announcementOpen: false
	},
	reducers: {
		loadFooter: (state, action) => {
			state.footer.items = action.payload.footer;
			state.footer.loaded = true;
		},
		toggleAnnouncement: (state, action) => {
			state.announcementOpen = action.payload;
		}
	},
});

export const { loadFooter, toggleAnnouncement } = LayoutSlice.actions;
export const useLayouts = () => useSelector((RootState: { layout }) => RootState.layout);
export default LayoutSlice.reducer;
