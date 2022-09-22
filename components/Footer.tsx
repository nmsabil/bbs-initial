import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { useLayouts } from '@core/redux/reducers/layout';
import Link from '@components/_shared/Link';
import RenderLottie from '@components/RenderLottie';
import { HiPlus } from 'react-icons/hi';
import { RichText } from 'prismic-reactjs';
import RenderSlice from './_slices/_renderslice';

interface FooterProps {
	lottie?: any
}

const Footer = ({ lottie }: FooterProps): JSX.Element => {
	const { footer } = useLayouts();
	const [openedAccordion, setOpenedAccordion] = useState(null);
	return (
		<>
			{footer.loaded && <RenderSlice slice={footer.items.body.find(slice => slice.slice_type === 'instagram_gallery')} />}
			{footer.loaded && <RenderSlice slice={footer.items.body.find(slice => slice.slice_type === 'subscribe_box')} />}
			<section className="w-full pb-14 pt-24 bg-light-pink relative flex-cc mt-20">
				{/* <RenderSlice slice={subSlice} /> */}
				{lottie && (
					<div className="absolute w-72 h-72 -md:w-64 -md:h-64 z-10 -top-44 -md:-top-32">
						<RenderLottie data={lottie} />
					</div>
				)}
				<div className="container flex-bs w-full -xl:col -xl:px-5">
					<div className="flex-bs w-1/2 -xl:w-full -md:col z-[11]">
						{footer.loaded && footer.items.body && footer.items.body.length !== 0 && (
							<>
								{footer.items.body.filter(slice => slice.slice_type === 'menus').map((slices, i) => (
									<div key={i} className={(i) === footer.items.body.length ? '-xl:hidden' : '-lg:w-1/4 -md:w-full'}>
										<div className={`-md:pt-4 md:border-t-0 border-t md:border-b-0 border-black flex-1 -md:w-full ${i+1 === footer.items.body.length ? 'border-b' : ''}`}>
											<div className="text-1.5xl font-secondary mb-4 flex-bc cursor-pointer rich-text" onClick={() => setOpenedAccordion(openedAccordion === i ? null : i)}>{RichText.render(slices.primary.parent_text)} <HiPlus className="cursor-pointer text-pink text-4xl md:hidden" /></div>
											<ul className={openedAccordion === i ? '' : '-md:hidden'}>
												{slices.items?.map((item, index) => (
													<Link href={item.child_route} key={index} ><li className="mb-2 font-normal">{RichText.render(item.child_text)}</li></Link>
												))}
											</ul>
										</div>
									</div>
								))}
							</>
						)}
					</div>
					<div className="w-1/2 flex justify-end -xl:flex-col -xl:w-full -xl:pt-12">
						<div className="xl:text-lg -xl:text-center -xl:mb-5 xl:mr-10">
							<a className="block" href={`mailto:${footer.items.email_text}`}>{footer.items.email_text}</a>
							<a className="block" href={`tel:${footer.items.phone_text}`}>{footer.items.phone_text}</a>
						</div>
						{
							footer && (
								<>
									<div className="flex justify-end -xl:justify-center">
										{footer.items.facebook_link && <Link target="_blank" href={footer.items.facebook_link} className="cursor-pointer border border-black rounded-full w-12 h-12 flex-cc text-xl ml-2"><FaFacebookF /></Link>}
										{footer.items.instagram_link && <Link target="_blank" href={footer.items.instagram_link} className="cursor-pointer border border-black rounded-full w-12 h-12 flex-cc text-xl ml-2"><FaInstagram /></Link>}
										{footer.items.twitter_link && <Link target="_blank" href={footer.items.twitter_link} className="cursor-pointer border border-black rounded-full w-12 h-12 flex-cc text-xl ml-2"><FaTwitter /></Link>}
										{footer.items.youtube_link && <Link target="_blank" href={footer.items.youtube_link} className="cursor-pointer border border-black rounded-full w-12 h-12 flex-cc text-xl ml-2"><FaYoutube /></Link>}
										{footer.items.tiktok_link && <Link target="_blank" href={footer.items.tiktok_link} className="cursor-pointer border border-black rounded-full w-12 h-12 flex-cc text-xl ml-2"><SiTiktok /></Link>}
									</div>
								</>
							)
						}
					</div>
				</div>
			</section>
			<section className="w-full bg-black py-7 text-white">
				<div className="container flex-bc w-full -xl:px-5 -xl:flex-cc -xl:flex-col-reverse -xl:text-center -xl:text-xs -xl:font-light">
					{footer.items.left_text && <div className="-xl:hidden">{RichText.render(footer.items.left_text)}</div>}
					<div className="md:hidden">Privacy policy & T&Cs | Cookie policy & preferences</div>
					{footer.items.middle_text && <div className="text-center">{RichText.render(footer.items.middle_text)}</div>}
					{footer.items.payment_methods_image && <img src={footer.items.payment_methods_image.url} alt="Payment Method" className="h-7 -md:mb-2 -xl:mb-3" />}
				</div>
			</section>
		</>
	);
};

export default Footer;
