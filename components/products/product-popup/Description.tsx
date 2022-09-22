import React from 'react';
import parse from 'html-react-parser';

interface Props {
	product: any
}

const Description = ({ product }: Props) => {
	return (
		<div className="product-content font-light">
			{parse(product.short_description ? product.short_description : '')}
			<style dangerouslySetInnerHTML={{
				__html: `
				.product-content p, .product-content div {
					font-size: 18px;
					font-weight: 300;
					margin-bottom:16px;
				}

				.product-content h2{
					margin-bottom:16px;
				}

				.product-content ul{
					list-style:disc;
					padding-left:2.5em;
					margin-bottom:16px;
				}

				.product-content ul li p{
					margin-bottom:12px;
				}
			`}} />
		</div>
	);
};

export default Description;
