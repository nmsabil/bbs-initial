import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import axios from 'axios';
interface Props {
	slice: SliceType
}

const CategoryShowcase = ({ slice }: Props) => {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		(async () => {
			if(slice.items.length > 0){
				const arrayOfSlugs = slice.items.map(item => {
					return item.category_slug;
				});
				const slugs = arrayOfSlugs.join(',');

				const response = await axios.get('api/categories?slugs=' + slugs);
				if (response.data?.data) response.data.data = response.data.data.filter(x => x != null);
				const _categories = response.data?.data ? response.data.data.reduce((obj, item) => Object.assign(obj, { [item.slug]: item }), {}) : [];
				setCategories(_categories);
			}
		})();
	}, []);

	return (
		<section className="w-full pt-28 pb-14 -lg:pt-12 -lg:pb-8">
			<div className="container -xl:px-5 flex-cc flex-col w-full">
				<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{slice.primary.title && RichText.asText(slice.primary.title)}</h2>
				<p className="text-2xl -lg:text-base  mt-4 text-center font-light">{slice.primary.subtitle && RichText.asText(slice.primary.subtitle)}</p>
				<ul className="grid grid-cols-4 -md:grid-cols-2 w-full gap-4 mt-8 text-center">
					{/* {Object.keys(categories).length === 0 && (
						<>
						{[...Array(4)].map((item, index) => (
								<li key={index}>
									<div className="h-100 -lg:h-44" style={{ background: '#eeeeee' }}></div>
								</li>
							))}
						</>
					)} */}
					{slice.items.map((item, index) => (
						<Link className={`w-full m-auto ${index % 2 == 1 ? '-lg:ml-0': '-lg:mr-0'}`} href={`/products/${item.category_slug}`} key={index}>
							<li>
								<div className="w-full bg-gray-100 relative m-auto" style={{paddingBottom:'100%'}}>
									{slice.items[index].image && item.tag_title && item.tag_color ? (
										<>
											<img src={slice.items[index].image.url} alt="happy bday" className="object-cover absolute" />
											<div className="triangle absolute right-0 top-0">
												<div className="triangle-top-right" style={{ borderTopColor: item.tag_color }}>
													<span>{RichText.asText(item.tag_title)}</span>
												</div>
											</div>
										</>
									) : (
										<img src={slice.items[index].image.url} alt="happy bday" className="w-full h-full object-cover absolute" />
									)}
								</div>
								<div className="mt-6 -lg:mt-2 lg:text-xl">
									<h3 className="font-bold">{item.title[0] ? item.title[0].text : categories[item.category_slug]?.name}</h3>
									{item.subheading[0] && (<h4>{item.subheading[0].text}</h4>)}
								</div>
							</li>
						</Link>
					))}
				</ul>
				{/* {cta_text && <Link className="mt-12" href={cta_text.href || '/shop'}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60 -lg:hidden">{cta_text.text}</button></Link>} */}
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.triangle .triangle-top-right {
							border-top: 100px solid;
							border-left: 100px solid transparent;
						}

						.triangle span{
							position: absolute;
							transform: rotate(45deg);
							color: black;
							width: 100%;
							top: 30px;
							left: 14px;
							font-size: 12px;
						}

						@media(min-width:1280px){
							.triangle .triangle-top-right {
								border-top: 160px solid;
								border-left: 160px solid transparent;
							}

							.triangle span{
								top: 60px;
								left: 24px;
								font-size: 20px;
							}
						}
						`,
				}}
			/>
		</section>
	);
};

export default CategoryShowcase;
