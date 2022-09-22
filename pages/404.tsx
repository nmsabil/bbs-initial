import React from 'react';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { queryLayout, queryMenuContent, formatNavbarContent, getSingleType } from '@core/prismic/client';
import MainLayout from '@components/_layouts/MainLayout';
import RenderSlice from '@components/_slices/_renderslice';
import { createClient } from '../prismicio'

const Page404 = ({ navbar, layout_content, content, footer, announcement }: any): JSX.Element => {
	const router = useRouter();
	const popup = layout_content.body.find((slice=> slice.slice_type === 'popup')) || null;
	const cookiePopup = layout_content.body.find((slice=> slice.slice_type === 'cookie_popup')) || null;
	return (
		<MainLayout title="Not Found" key={router.asPath} className="flex-cc col" navbar={navbar} footer={footer} announcement={announcement} popup={popup} cookiePopup={cookiePopup} content={[]}>
			{content.body.map((slice, i) => (
				<RenderSlice slice={slice} key={i} />
			))}
		</MainLayout>
	);
};

export const getStaticProps = async ({previewData}): Promise<GetStaticPropsResult<any>> => {

	const client = createClient({previewData});
	const uid = 'error';

	const content = await getSingleType(uid);
	const layout_content = await queryLayout(client, content.layout.uid);

	const navbarSlice = layout_content.body.find((slice=> slice.slice_type === 'navbar'));
	const navbarContent = await queryMenuContent(client, navbarSlice.primary.navbar_content.id);
	const navbar = formatNavbarContent(navbarContent);

	// const footer = await getFooter();

	const footerSlice = layout_content.body.find((slice) => slice.slice_type === 'footer');
	const footer = await queryMenuContent(client, footerSlice.primary.footer_content.id);

	const announcement = layout_content.body.find((slice=> slice.slice_type === 'announcement'));

	return { props: { navbar, content, footer, announcement, layout_content } };
};


export default Page404;
