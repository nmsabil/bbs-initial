import { RichText } from 'prismic-reactjs';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';

import OutsideClickHandler from 'react-outside-click-handler';
import { CardProps } from './CookieCrew';

interface Props {
	show: boolean;
	card: CardProps;
	onClose: () => void;
}

const Modal: React.FC<Props> = ({ show, card, onClose }: Props): JSX.Element => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleClose = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
					<div className="px-8 modal-content">
						<div className="overflow-hidden relative" style={{paddingBottom: '100%'}}>
							<img src={card.avatar.url} alt="profile picture" className="w-full h-full object-cover absolute" />
						</div>
						<div className="md:grid md:grid-cols-3 -md:text-center">
							<div className="mt-4">
								<h3 className="font-semibold">{card.first_name}</h3>
								<p>{card.job_title}</p>
							</div>
							<div className="mt-4 ml-6 text-sm font-light whitespace-nowrap rich-text">
								{RichText.render(card.description)}
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
					z-index: 30;
					background-color: rgba(0, 0, 0, 0.7);
				}
				.modal {
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -45%);
					width: 550px;
					height: 655px;
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
				// tablet and desktop
				@media(min-width: 768px){
					.modal {
						max-height: 655px;
						height: calc(100vh - 120px);
						max-width: calc(100vh - 180px);
					}
					.modal-content {
						height: calc(100vh - 120px);
					}
					.modal-content img {
						// height: 73%;
					}
				}
				// mobile and tablet
				@media(max-width: 1023px){
					.modal {
				    padding-bottom: 30px;
				    // max-height: 100vh;
				    overflow: auto;
					}
				}
				// mobile
				@media(max-width: 767px){
					.modal {
						height: auto;
						width: 85vw;
						// top: 390px;
						max-width: 550px;
					}
				}
				// small mobile
				@media(max-width: 638px){
					.modal {
						width: 100vw;
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
