import React, { useEffect } from 'react';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { ContentType, queryByRoute, queryLayout, queryBlogByRoute, getAllPaths, queryRecipesByRoute, queryCareersByRoute, queryMenuContent, formatNavbarContent } from '@core/prismic/client';
import MainLayout from '@components/_layouts/MainLayout';
import RenderSlice from '@components/_slices/_renderslice';
import { createClient } from '../prismicio'

const CustomPage = ({ content, navbar, footer, products, layout_content, announcement }: StaticProps): JSX.Element => {
	const router = useRouter();
	const popup = layout_content.body.find((slice=> slice.slice_type === 'popup')) || null;
	const cookiePopup = layout_content.body.find((slice=> slice.slice_type === 'cookie_popup')) || null;

	useEffect(() => {
		window.scrollTo(0,0);
	});

	return (
		<MainLayout key={router.asPath} title={content['seo_title']} description={content['seo_description']} image={content['seo_image']?.url} navbar={navbar} footer={footer} announcement={announcement} popup={popup} cookiePopup={cookiePopup} content={content}>
			<h1 className='hidden'>{`${content['seo_title'] ? content['seo_title']+' — ' : ''}Baked by Steph`}</h1>
			{content.body1 && content.body1.length > 0 ? (
				<div className="flex-sc col">
					<div className="lg:grid lg:grid-cols-2 gap-8 md:mt-11 container w-full max-w-6xl -lg:max-w-xl mb-16">
						<div className="col-left lg:sticky md:top-36" style={{maxHeight: '800px'}}>
							{content.body1.map((slice, i) => {
								if(slice.primary.column_position === 'left'){
									return (
										<RenderSlice slice={slice} key={i} products={products}/>
									);
								}
							})}
						</div>
						<div className="col-right overflow-y-scroll overflow-x-hidden -lg:no-scrollbar -lg:mt-8 -lg:max-h-full lg:max-h-[800px] -sm:h-full carousel">
							{content.body1.map((slice, i) => {
								if(slice.primary.column_position === 'right'){
									return (
										<RenderSlice slice={slice} key={i} products={products}/>
									);
								}
							})}
						</div>
					</div>
					<style
						dangerouslySetInnerHTML={{
							__html: `
							.carousel::-webkit-scrollbar-track {
								background: #e5e5e5;
								width: 30px !important;
							}
							.carousel::-webkit-scrollbar {
								width: 6px;
							}
							.carousel::-webkit-scrollbar-thumb {
								background: #FF5897;
								border-radius: 6px;
							}
							.carousel::-webkit-scrollbar-thumb:hover {
								background: #e8518a;
								border-radius: 6px;
							}
							.carousel::-webkit-scrollbar-track-piece{
								width:	80%;
								display: none;
							}
							`,
						}}
					/>
				</div>
			) : (
				<>
					{content.body.map((slice, i) => (
						<RenderSlice slice={slice} key={i} products={products}/>
					))}
				</>
			)}
		</MainLayout>
	);
};

export interface StaticProps {
	content: ContentType
	layout_content: any
	navbar: any
	footer: any
	products?: any
	announcement: any
	forms?: any
}

export const getStaticProps = async ({params, previewData}): Promise<GetStaticPropsResult<StaticProps>> => {

	const client = createClient({previewData});

	// const footer = await getFooter();
	const { customs } = params;
	const route = customs[0] == 'home' ? '/' : '/' + customs.join('/');
	const content = (await queryByRoute(client, route)) || (await queryBlogByRoute(client, route)) || (await queryRecipesByRoute(client, route)) || (await queryCareersByRoute(client, route));

	const layout_content = await queryLayout(client, content.layout.uid);

	const navbarSlice = layout_content.body.find((slice=> slice.slice_type === 'navbar'));
	const navbarContent = await queryMenuContent(client, navbarSlice.primary.navbar_content.id);
	const navbar = formatNavbarContent(navbarContent);

	const footerSlice = layout_content.body.find((slice) => slice.slice_type === 'footer');
	const footerContent = await queryMenuContent(client, footerSlice.primary.footer_content.id);
	const footer = footerContent;

	const announcement = layout_content.body.find((slice=> slice.slice_type === 'announcement')) || null;

	return {
		props: {
			content,
			layout_content,
			navbar,
			footer,
			announcement,
		},
	};
};

interface StaticPaths {
	paths: { params: { customs: string } }[]
	fallback: false
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const client = createClient();
	const paths = await getAllPaths(client);

	return {
		paths: paths,
		fallback: false
	};
};

export default CustomPage;
