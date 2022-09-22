import React from 'react';
import Link from '@components/_shared/Link';
// import parse from 'html-react-parser';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';

interface ProductsShowcaseProps {
    title?: string;
		cta?: Array<{
			cta_text: string;
			cta_route: string;
		}>;
		content: string | React.ReactNode;
    slice: SliceType
}

const TextWithCTA = ({ title, cta, content, slice }: ProductsShowcaseProps): JSX.Element => {
	return (
		<>
			<section className="w-full pb-28 -lg:pb-10 mt-5 -md:px-5">
				<div className="container flex-cc flex-col w-full pt-8 -md:border-t">
					{ title && <h2 className="text-4xl -lg:text-3xl font-medium font-secondary mb-5 -lg:px-5 -lg:text-center">{ title }</h2> }
          {slice?.primary?.desccription && (
            <div className="text-center text-xl max-w-3xl -md:text-base font-light rich-text">{RichText.asText(slice.primary.desccription)}</div>
          )}
          {/*content?.length && (
            <div className="content max-w-4xl text-center -lg:text-left font-light -lg:text-lg -lg:mb-4 -lg:px-5">
  						{ typeof content === 'string' ?  parse(content) : content }
  					</div>
          )*/}
					<div className="flex gap-4 md:mt-8">
						{ cta?.map((item, index) => (
							<Link href={item.cta_route} key={index}><button className="bg-pink text-white py-3 rounded-full mt-4 lg:text-xl -lg:w-44 w-60">{ item.cta_text }</button></Link>
						)) }
					</div>
				</div>
			</section>
			<style
				dangerouslySetInnerHTML={{
					__html: `
                @media(min-width: 1024px){
                  .content p{
                    margin-bottom:16px;
                    font-size:22px;
                  }
                }
                @media(max-width: 1023px){
                    .content p {
                        margin-bottom:0px;
                    }
                }
                `,
				}}
			/>
		</>
	);
};

export default TextWithCTA;
