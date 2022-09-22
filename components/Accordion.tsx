import React from 'react';
import parse from 'html-react-parser';
import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { RichText } from 'prismic-reactjs';

interface AccordionProps {
    data: any
}

interface AccordionItemProps {
    data: any
    index: number
}

const AccordionItem = ({ data, index }: AccordionItemProps): JSX.Element => {
	const [open, setOpen] = useState(false);

	return(
		<>
			<li className={`w-full flex-bc text-xl py-5 font-medium cursor-pointer border-black border-b ${index === 0 ? 'border-t' : ''}`} key={index} onClick={() => setOpen(!open)}>{typeof data.label === 'string' ? data.label : RichText.asText(data.label)  } { open ? <FiMinus className="text-pink"/> : <FiPlus className="text-pink"/> }</li>
			{ open && (
				<div className="bg-gray w-full mt-4 flex-cc p-5">
					<div className="accordion max-w-4xl w-full rich-text">
						{ typeof data.content === 'string' ? parse(data.content) : RichText.render(data.content) }
					</div>
				</div>
			) }
		</>
	);
};

const Accordion = ({ data }: AccordionProps): JSX.Element => {
	return (
		<>
			<section className="w-full pb-28 -lg:pb-14">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<ul className="flex w-full flex-col">
						{ data.map((item, index) => (
							<AccordionItem key={index} data={item} index={index}/>
						)) }
					</ul>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: `
                    .accordion h2{
                        margin-bottom:16px;
                        font-size:18px;
                        font-weight:medium;
                        font-family: TJ Evolette A Basic;
                    }
                    .accordion h2{
                        margin-top:32px;
                    }
                    .accordion h2:first-of-type{
                        margin-top:0px;
                    }
                    .accordion p{
                        margin-bottom:18px;
                        font-size:16px;
                    }
                    `,
					}}
				/>
			</section>
		</>
	);
};

export default Accordion;
