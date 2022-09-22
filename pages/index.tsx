import CustomPage, { StaticProps } from './[...customs]';
import { GetStaticPropsResult } from 'next';
import { formatNavbarContent, queryByRoute, queryLayout, queryMenuContent } from '@core/prismic/client';
import { createClient } from '../prismicio'

export const getStaticProps = async ({previewData}): Promise<GetStaticPropsResult<StaticProps>> => {
	const client = createClient({previewData});
	// const footer = await getFooter();
	const content = await queryByRoute(client, '/');
	const layout_content = await queryLayout(client, content.layout.uid);

	const navbarSlice = layout_content.body.find((slice=> slice.slice_type === 'navbar'));
	const navbarContent = await queryMenuContent(client, navbarSlice.primary.navbar_content.id);
	const navbar = formatNavbarContent(navbarContent);

	const footerSlice = layout_content.body.find((slice) => slice.slice_type === 'footer');
	const footerContent = await queryMenuContent(client, footerSlice.primary.footer_content.id);
	const footer = footerContent;

	const announcement = layout_content.body.find((slice=> slice.slice_type === 'announcement'));

	return {
		props: {
			content,
			layout_content,
			navbar: navbar,
			footer,
			announcement
		},
	};
};

export default CustomPage;
