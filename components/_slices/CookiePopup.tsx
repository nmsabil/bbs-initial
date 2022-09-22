import { SliceType } from '@core/prismic/client';
import React, { useState, useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import { IoCloseOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import { linkResolver } from '@core/utils/link-resolver';

interface Props {
	slice: SliceType
}

const CookiePopup = ({ slice }: Props): JSX.Element => {
	const cookieName = `cookie_popup-${slice.primary.reset_timestamp}`;
	const [open, setOpen] = useState(false);

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
					<div className="modal-box flex relative z-40 font-light" style={{ boxShadow: '0px 5px 20px #00000029' }}>
						<div className="absolute top-2 right-2 cursor-pointer -lg:right-4 -lg:top-2">
							<IoCloseOutline className='w-7 h-7' onClick={() => closePopup()}/>
						</div>
						<div>
							<div className="modal-content lg:m-auto p-6 pt-8">
								<div className="text-lg -lg:text-base pink-links"><RichText render={slice.primary.text} linkResolver={linkResolver} /></div>
							</div>
						</div>
					</div>
				)}
			</div>
			<style jsx>{`
			.modal-box {
				background-color: #ffffff;
				max-width: 400px;
				left: 2rem;
				bottom: 2rem;
				position: fixed;
			}
			.modal-content a {
				color: rgba(255,88,151,var(--tw-bg-opacity));
			}
			@media (max-width: 767px) {
				.modal-box {
					width: 100vw;
					bottom: 0;
					left: 0;
				}
			}
		`}</style>
		</>);
};

export default CookiePopup;
