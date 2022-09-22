import React, { useState } from 'react';
import * as cheerio from 'cheerio';
import Modal from './Modal';
import yelloHeart from '../../public/lottie/yellow-heart.json';
import RenderLottie from '@components/RenderLottie';

interface Props {
	content: any;
	crews: any;
}

const BrandStory = ({ content, crews }: Props) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [cardIndex, setCardIndex] = useState<number | null>(null);

	const cookieCrews = crews.filter((crew)=>{
		return crew.acf.cookie_crew == true;
	});

	const cards = cookieCrews.map(card => {
		return {
			firstname: card.first_name,
			job_title: card.acf.job_title,
			image_url: card.simple_local_avatar != undefined ? `${card.simple_local_avatar.full}` : `${card.avatar_urls[96]}`,
			hobby: card.description
		};
	});

	const $ = cheerio.load(content);
	const section = {
		title: $('h1').text(),
		description: $('p').text()
	};

	return (
		<section className="w-full py-28 -sm:py-10 pb-40 -sm:px-6">
			<div className="container flex-cc flex-col w-full relative">
				<h1 className="text-7xl -sm:text-6xl -sm:text-center font-black font-secondary relative">
					{section.title}
					<div className="absolute w-96 h-96 z-10 left-0 top-0 animation">
						<RenderLottie data={yelloHeart} />
					</div>
				</h1>
				<div className="mt-6">
					<h2 className="text-xl leading-8 -sm:hidden">{section.description}</h2>
				</div>
				<Modal show={showModal} onClose={() => setShowModal(false)} card={cards[cardIndex]} />
				<div className="grid grid-cols-4 -sm:grid-cols-2 gap-4 mt-16">
					{cards.map((card, index) => (
						<div className="flex-cc -sm:flex-ss col" key={index}>
							<div className="hover:scale-105 transition duration-200 ease-in-out cursor-pointer" onClick={() => {
								setShowModal(!showModal);
								setCardIndex(index);
							}}>
								<img src={card.image_url} alt="bio face" className="object-cover w-72 h-72 -sm:h-40" />
							</div>
							<div className="mt-2 text-center -sm:text-left">
								<h3 className="font-semibold">{card.firstname}</h3>
								<p>{card.job_title}</p>
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
			`}</style>
		</section>
	);
};

export default BrandStory;
