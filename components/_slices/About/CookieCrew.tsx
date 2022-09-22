import React, { useState } from 'react';
import yelloHeart from '../../../public/lottie/yellow-heart.json';
import RenderLottie from '@components/RenderLottie';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import Modal from './Modal';
interface Props {
	slice: SliceType
}

export interface CardProps {
	first_name : string,
	job_title : string,
	avatar : {
		dimensions: { width: number, height: number },
		alt: null | string,
		copyright: null | string,
		url: string
	},
	description : RichTextBlock[]
}

const CookieCrew = ({slice}: Props) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [cardIndex, setCardIndex] = useState<number | null>(0);
	const {title, description} = slice.primary;
	const cards : CardProps[]  = slice.items;

	return (
		<section className="w-full pb-28 pt-14 -lg:py-10 pb-40 -xl:px-6">
			<div className="container flex-cc flex-col w-full relative">
				<h2 className="text-7xl -sm:text-6xl -lg:text-center font-black font-secondary relative">
					{RichText.asText(title)}
					<div className="absolute w-96 h-96 z-10 left-0 top-0 animation">
						<RenderLottie data={yelloHeart} />
					</div>
				</h2>
				<div className="mt-6">
					<div className="text-xl leading-8 -lg:text-center font-light -lg:max-w-xl text-center max-w-2xl">{RichText.asText(description)}</div>
				</div>
				<Modal show={showModal} onClose={() => setShowModal(false)} card={cards[cardIndex]} />
				<div className="grid grid-cols-4 -xl:grid-cols-3 -sm:grid-cols-2 gap-4 mt-16">
					{cards.map((card, index) => (
						<div className="col" key={index}>
							<div className="hover:scale-105 transition duration-200 ease-in-out cursor-pointer relative" style={{paddingBottom: '100%'}} onClick={() => {
								setShowModal(!showModal);
								setCardIndex(index);
							}}>
								<img src={card.avatar.url} alt="bio face" className="object-cover w-full h-full absolute" />
							</div>
							<div className="mt-2 text-center -sm:text-left">
								<h3 className="font-semibold">{card.first_name}</h3>
								<p className="pb-4">{card.job_title}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<style jsx>{`
			.animation{
				top: -9rem;
				left: -24rem;
				transform: scaleX(-1);
			}
			@media(max-width: 1023px){
				.animation{
					left: -4rem;
					top: 1.5rem;
					// z-index: -1;
					width: 200px;
				}
			}
			@media(max-width: 767px){
				.animation{
					top: 3.5rem;
				}
			}
			`}</style>
		</section>
	);
};

export default CookieCrew;
