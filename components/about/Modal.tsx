import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import parse from 'html-react-parser';
import OutsideClickHandler from 'react-outside-click-handler';

interface Props {
	show: boolean;
	card: {
		firstname: string;
		job_title: string;
		image_url: string;
		hobby: string;
	}
	onClose: () => void;
}

const Modal: React.FC<Props> = ({ show, card, onClose }: Props): JSX.Element => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleClose = (e) => {
		e.preventDefault();
		onClose();
	};

	const modal = show && (
		<section className="overlay fade-in">
			<OutsideClickHandler onOutsideClick={handleClose}>
				<div className="modal">
					<div className="flex-ee p-2 pb-1">
						<button onClick={handleClose}><IoMdClose size={24} color="#FF5897" /></button>
					</div>
					<div className="px-8">
						<img src={card.image_url} alt="profile picture" className="object-cover w-full max-h-sm/lg -sm:max-h-72" />
						<div className="grid grid-cols-2">
							<div className="mt-4">
								<h3 className="font-semibold">{card.firstname}</h3>
								<p>{card.job_title}</p>
							</div>
							<div className="mt-4 text-sm font-light">
								{parse(card.hobby.replace(/, /g, '<br />') || '')}
							</div>
						</div>
					</div>
				</div>
			</OutsideClickHandler>
			<style jsx>{`
				.overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 20;
					background-color: rgba(0, 0, 0, 0.7);
				}
				.modal {
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -45%);
					width: 550px;
					height: 625px;
					z-index: 30;
					background-color: #FFFFFF;
				}
				.fade-in {
					opacity: 1;
					animation: fadeInOpacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
				}
				@keyframes fadeInOpacity {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}
				@media(max-width: 1023px){
					.modal {
						width: 350px;
						height: 425px;
					}
				}
			`}</style>
		</section>
	);

	if(isBrowser) {
		return ReactDOM.createPortal(
			modal,
			document.getElementById('modal-root')
		);
	} else {
		return null;
	}
};

export default Modal;
