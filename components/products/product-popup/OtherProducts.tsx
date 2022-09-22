import { getRelatedProducts } from '@core/utils/shop';
import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import Link from '@components/_shared/Link';
interface Props {
	product: any
}

const OtherProducts = ({ product }: Props): JSX.Element => {
	const [otherProducts, setOtherProducts] = useState([]);

	useEffect(() => {
		(async () => {
			const related_ids = product.related_ids;
			if (related_ids.length > 0) {
				const ids = related_ids.join();
				const relatedProducts = await getRelatedProducts(ids);

				setOtherProducts(relatedProducts.data.products);
			}
		})();
	}, []);

	return (
		<div className="w-full mt-20">
			<p className="text-2xl font-secondary mb-4">YOU MAY ALSO LIKE...</p>
			<div className="w-full">
				<CarouselProducts data={otherProducts} />
			</div>
		</div>
	);
};

const CarouselProducts = ({ data }: { data: any }) => (
	<div className="w-full">
		<div className="w-full h-96">
			<Flickity
				className="overflow-hidden h-full focus:outline-none"
				options={{
					freeScroll: false,
					contain: true,
					prevNextButtons: false,
					cellAlign: 'left'
				}}
			>
				{data?.map((item, index) => {
					return (
						<Link href={'/shop/' + item.slug} key={index} >
							<div className="mx-2 h-80 -lg:h-60 w-60 -lg:w-32 cursor-pointer">
								{item.images[0] && <img className="object-cover h-60 -lg:h-32 w-60 -lg:w-32 mb-2" src={item.images[0].src} alt="preview" />}
								<div className="flex-cc col">
									<p className="text-xl font-bold">{item.name}</p>
									<p className="text-lg">£{item?.price}</p>
								</div>
							</div>
						</Link>
					);
				})}
			</Flickity>

			<style dangerouslySetInnerHTML={{
				__html: `
				/* position dots up a bit */
				.flickity-page-dots {
					position: relative;
					bottom: -32px;
					height: 4px;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #0003;
				}
				/* dots are lines */
				.flickity-page-dots .dot {
					height: 100%;
					width: 100%;
					margin: 0;
					border-radius: 0;
					cursor: pointer;
				}

				.flickity-page-dots .is-selected {
					background: #FF5897 !important;
				}
			`}} />
		</div>
	</div>
);

export default OtherProducts;
