import { loadFooter, toggleAnnouncement } from '@core/redux/reducers/layout';

export const loadFooterMenus: any = (footer) => async (dispatch) => {
	dispatch(
		loadFooter({
			footer: footer,
		})
	);
};

export const toggleAnnouncementBar: any = (toggle) => async (dispatch) => {
	dispatch(
		toggleAnnouncement(toggle)
	);
};