import React,{ useState } from 'react';
import parse from 'html-react-parser';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface AccordionProps {
	data: any
}

interface AccordionItemProps {
	data: any
	index: number
	IsOpen : number | null
	setIsOpen : (arg0: number | ((prev: number)=> number | null))=> void
}

const AccordionItem = ({ data, index,setIsOpen,IsOpen }: AccordionItemProps): JSX.Element => {

	return (
		<div className={`mb-2`} id={`${IsOpen == index ? 'open-accordion' : ''}`}>
			<li className={`w-full flex-bc text-2xl py-5 font-normal font-secondary uppercase cursor-pointer px-5 ${IsOpen == index ? 'text-pink' : ''}`} style={{ background: data.color }} key={index} onClick={() => setIsOpen((prev)=> prev === index ? null : index)}>{data.label} {IsOpen === index ? <FiMinus className="text-pink" /> : <FiPlus className="text-pink" />}</li>
			{IsOpen === index && (
				<div className="w-full flex-cc p-5 font-light" style={{ background: data.color }}>
					<div className="accordion max-w-4xl w-full rich-text">
						{
							typeof data.content === 'string' ?
								parse(data.content)
								:
								data.content
						}
					</div>
				</div>
			)}
		</div>
	);
};

const ColoredAccordion = ({ data }: AccordionProps): JSX.Element => {
	const [IsOpen, setIsOpen] = useState(null);

	const handleOpen = (state) => {
		setIsOpen(state);
		setTimeout(() => { scrollToAccordion() }, 100);
	}

	const scrollToAccordion = () => {
		// document.getElementById("open-accordion").scrollIntoView();
		const element = document.getElementById("open-accordion");
		if (element) {
			const y = element.getBoundingClientRect().top + window.pageYOffset - 150;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	}

	return (
		<>
			<section className="w-full pb-28 -xl:pb-4">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<ul className="flex w-full flex-col">
						{data.map((item, index) => (
							<AccordionItem IsOpen={IsOpen} setIsOpen={handleOpen} key={index} data={item} index={index} />
						))}
					</ul>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: `
							.accordion h2{
							    margin-bottom:16px;
							    font-size:18px;
							    font-weight:medium;
							    // font-family: TJ Evolette A Basic;
									font-weight: 500;
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
							.accordion figure{
								display:none;
							}
							@media(min-width:1024px){
							}
							@media(min-width:1023px){
								.accordion h1{
									display:none;
								}
							}
                    `,
					}}
				/>
			</section>
		</>
	);
};

export default ColoredAccordion;
