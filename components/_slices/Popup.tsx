import { SliceType } from '@core/prismic/client';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { RichText } from 'prismic-reactjs';
import { IoCloseOutline } from 'react-icons/io5';
import Link from '@components/_shared/Link';
import Cookies from 'js-cookie';
import { linkResolver } from '@core/utils/link-resolver';

interface Props {
	slice: SliceType
}

const Popup = ({ slice }: Props): JSX.Element => {
	const primary = slice.primary;
	const code = primary.code;
	const cookieName = `newsletter_popup-${slice.primary.reset_timestamp}`;
	const [open, setOpen] = useState(false);
	const newsletterSignup = (slice.primary.goal == 'Sign up for a newsletter');

	const getExpiration = (frequency) => {
		switch (frequency) {
			case 'Every day':
				return 1;
			case 'Every Week':
				return 7;
			case 'Every Two Weeks':
				return 14;
			case 'Every Month':
				return 30;
			default:
				return 365;
		}
	};

	const closePopup = () => {
		setOpen(false);
		Cookies.set(cookieName, true, { expires: getExpiration(slice.primary.frequency) });
	};

	useEffect(()=>{
		const cookie = Cookies.get(cookieName);
		setOpen(cookie != 'true');
	},[]);

	return (
		<>
			<div>
				{open && (
					<div className={'fixed w-full h-screen top-0 left-0 z-50 flex-cc'}>
						<div onClick={() => closePopup()} className='bg-black bg-opacity-50 w-full h-full absolute' ></div>
						<div className="modal-box flex relative grid-cols-2" style={{backgroundColor: primary.background_color, color: primary.text_color}}>
							<div className="absolute top-2 right-2 cursor-pointer -lg:right-4 -lg:top-2">
								<IoCloseOutline className='w-10 h-10' onClick={() => closePopup()}/>
							</div>
							{slice.primary.image &&
								<div className="modal-image -lg:hidden">
									<img src={slice.primary.image.url} alt={slice.primary.image.alt} className="" />
								</div>
							}
							<div className={`lg:w-6/12 -lg:w-full p-5 ${newsletterSignup ? 'pb-0' : 'lg:pb-16 -lg:pb-10'}`}>
								<div className="modal-content lg:m-auto p-6 pb-0">
									<h2 className="font-bold text-4xl mb-3 -lg:text-xl">{RichText.asText(slice.primary.title)}</h2>
									<div className="text-lg -lg:text-base pink-links font-light"><RichText render={slice.primary.text} linkResolver={linkResolver} /></div>
									{!newsletterSignup && slice.primary.button_label && slice.primary.button_link &&
										<Link href={`/${slice.primary.button_link.uid}`} onClick={closePopup}>
											<div className="button px-20 py-3 -lg:px-10 mt-12 -lg:mt-6 text-xl -lg:text-lg text-white text-center bg-pink">{slice.primary.button_label}</div>
										</Link>
									}
								</div>
								{newsletterSignup &&
									parse(RichText.asText(code) || '')
								}
							</div>
						</div>
					</div>
				)}
			</div>
			<style jsx>{`
				.modal-box {
					background-color: #ffffff;
					max-width: 840px;
				}
				.modal-image {
					max-width: 420px;
					min-height: 100px;
					object-fit: cover;
	    		min-height: 100%;
				}
				.modal-image img {
					object-fit: cover;
	    		min-height: 100%;
				}
				@media (max-width: 767px) {
					.modal-box {
						width: 100vw;
						bottom: 0;
					}
				}
			`}</style>
		</>
	);
};

export default Popup;
