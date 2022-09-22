import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import parse from 'html-react-parser';

interface AccordionProps {
	product: any
}

const Accordion = ({ product }: AccordionProps) => {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);

	return (
		<div className="flex-cc col w-full my-16">
			<AccordChild
				toggleHandler={() => setActiveIndex(activeIndex === 1 ? null : 1)}
				isOpen={activeIndex === 1 && activeIndex !== null}
				title="Product Info"
				richtext={product.acf.ingredients}
				key={1}
			/>
			<AccordChild
				toggleHandler={() => setActiveIndex(activeIndex === 2 ? null : 2)}
				isOpen={activeIndex === 2 && activeIndex !== null}
				title="SHIPPING"
				richtext={product.acf.shipping}
				key={2}
			/>
			<AccordChild
				toggleHandler={() => setActiveIndex(activeIndex === 3 ? null : 3)}
				isOpen={activeIndex === 3 && activeIndex !== null}
				title="How long do they last"
				richtext={product.acf.expiration}
				key={3}
			/>
			<hr className="w-full h-0.5 bg-black" />
		</div>
	);
};

interface AccordChildProps {
	title: string;
	richtext: string;
	isOpen: boolean;
	toggleHandler(): void;
}

const AccordChild = ({ title, richtext, isOpen, toggleHandler }: AccordChildProps) => (
	<div className="flex-cc col w-full mb-2 font-light">
		<div className="w-full cursor-pointer" onClick={toggleHandler}>
			<hr className="w-full h-0.5 bg-black" />
			<div className="flex-bc pt-4 pb-2">
				<p className="font-secondary text-2xl font-medium uppercase">{title}</p>
				{isOpen ? <FaMinus className="text-lg text-pink" /> : <FaPlus className="text-lg text-pink" />}
			</div>
		</div>
		<div className={['w-full py-4 accordion-content', !isOpen && 'hidden'].join(' ')}>
			{richtext && parse(richtext || '')}
		</div>
		<style dangerouslySetInnerHTML={{
			__html: `
			.accordion-content p{
				font-size:18px;
				margin-bottom:16px;
			}
		`}} />
	</div>
);

export default Accordion;
